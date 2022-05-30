const sql = require('./db.js');

const Cart = function (cart) {
    this.productId = cart.productId;
    this.userId = cart.userId;
}

Cart.findForUser = (userId, result) => {
    sql.query('SELECT * from cart as c INNER JOIN product as p ON c.product_id = p.id WHERE c.user_id = ?', userId,
        (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found category: ", res);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
    })
}

Cart.create = (newCart, result) => {
    console.log(newCart);
    sql.query("INSERT INTO cart SET ? ", newCart, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log("created cartItem: ", {id: res.insertId, ...newCart});
        result(null, {id: res.insertId, ...newCart});
    })
}

Cart.delete = (productId, result) => {
    sql.query("DELETE FROM cart WHERE product_id = ?", productId, (err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted cartProduct with product_id: ",);
        result(null, res);
    });
}

Cart.deleteUser = (userId, result) => {
    sql.query("DELETE FROM cart WHERE user_id = ?", userId, ( err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted cartProduct with user_id: ",);
        result(null, res);
    });
}

module.exports = Cart;
