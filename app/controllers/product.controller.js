const Product = require("../models/product.model.js");

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    const product = new Product({
        name : req.body.name,
        price: req.body.price,
        path: req.body.path,
        category_id: req.body.category_id
    });

    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(data);
    });
}

exports.search = ( req, res) => {

    Product.search(req.query.search, ( err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the product."
            });
        else res.send(data);
    })

}

exports.category = ( req, res ) => {
    Product.category(req.params.productId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the category for given product."
            });
        else res.send(data);
    })
}

exports.updateNumberOfProducts = (req, res) => {
    Product.updateNumberOfProducts(req.params.productId, req.body.numberOfProducts,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the number of products for given product."
            });
        else res.send(data);
    })
}