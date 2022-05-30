const sql = require('./db.js');

const Product = function (product) {
    this.name = product.name;
    this.price = product.price;
    this.path = product.path;
    this.category_id = product.category_id;
}

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO product SET ? ", newProduct, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log("created product: ", {id: res.insertId, ...newProduct});
        result(null, {id: res.insertId, ...newProduct});
    });
};

Product.getAll = result => {
    sql.query("SELECT * FROM product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("products", res);
        result(null, res);
    })
}

Product.search = (productName, result) => {
    sql.query(`SELECT * FROM product WHERE name LIKE '%${productName}%'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Products found by search ", res);
        result(null, res);
    })
}

Product.category = (productId, result) => {
    sql.query(`SELECT c.name FROM (SELECT * FROM product WHERE id=${productId}) as temp INNER JOIN category as c 
    ON temp.category_id = c.id`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("products", res[0]);
        result(null, res[0]);
    })
}

Product.updateNumberOfProducts = (productId, numberOfProducts, result) => {
    sql.query('UPDATE product SET number_of_products= ? WHERE id = ? ', [numberOfProducts, productId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated product with product_id: ", productId);
        result(null, res);
    })
}

module.exports = Product;
