const sql = require('./db.js');

const User = function (user) {
    this.name = user.name;
    this.lastName = user.lastname;
    this.email = user.email;
    this.balance = user.balance;
}

User.create = (newUser, result) => {
    sql.query("INSERT into users SET ? ", newUser, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log("Created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    })
}

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated user: ", res[0]);
        result(null, res[0]);
    });
};

User.findByEmail = (email, result) => {
    sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    })
}

User.changeBalance = (userId, balance, result) => {
    // console.log('userId = ' + userId + " balance = " + balance);
    sql.query('UPDATE users SET balance = ? WHERE id = ? ', [balance, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated user: ", {id: userId});
        result(null,res.data);
    });
}

module.exports = User;
