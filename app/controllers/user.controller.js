const User = require("../models/user.model.js") ;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email : req.body.email,
        balance : req.body.balance
    })

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        else res.send(data);
    })
}

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
}

exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with emai; ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with email " + req.params.email
                });
            }
        } else res.send(data);
    });
}

exports.changeBalance = (req, res) => {
    User.changeBalance(req.params.userId, req.params.balance,  (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id; ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
}
