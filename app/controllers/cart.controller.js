const Cart = require("../models/cart.model.js");

exports.findCartProducts = (req, res) => {
    Cart.findForUser(req.params.userId, (err, data) => {
        if (!data) {
            data = [];
        }
        res.send(data);
    });
}

exports.create = (req, res) => {

    const cartItem = {
        product_id: req.body.productId,
        user_id: req.body.userId,
    }

    Cart.create(cartItem, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding to cart"
            });
        else res.send(data);
    });
}

exports.delete = (req, res) => {
    Cart.delete(req.params.productId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting from cart"
            });
        else res.send(data);
    });
}

exports.deleteUser = (req, res) => {
    Cart.deleteUser(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting from cart"
            });
        else res.send(data);
    });
}
