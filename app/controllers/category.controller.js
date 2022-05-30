const Category = require("../models/category.model.js");

// Create and Save a new Category
exports.create = (req, res) => {
// Validate request
	console.log('create called');
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	console.log('body = ', req.body);

	// Create a Category
	const category = new Category({
		name: req.body.name
	});


	// Save Category in the database
	Category.create(category, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the category."
			});
		else res.send(data);
	});
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
	Category.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving categories."
			});
		else res.send(data);
	});
};

exports.first = (req, res) => {
	Category.firstCategory((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving categories."
			});
		else res.send(data);
	});
};


// Find a single Category with a CategoryId
exports.findOne = (req, res) => {
	Category.findById(req.params.categoryId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Category with id ${req.params.categoryId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Category with id " + req.params.categoryId
				});
			}
		} else res.send(data);
	});
};

exports.findProducts = (req, res) => {
	if (req.query.page && req.query.productsPerPage) {
		Category.findPage(req.params.categoryId, req.query.page, req.query.productsPerPage, (err, data) => {
			if (err) {
				res.status(500).send({
					message: "Error retrieving products"
				});
			} else {
				res.send(data);
			}
		})
	} else {
		Category.findAllProducts(req.params.categoryId, (err, data) => {
			if (err) {
				res.status(500).send({
					message: "Error retrieving products"
				});
			} else {
				res.send(data);
			}
		});
	}

}

exports.countProducts = (req, res) => {
	Category.countProducts(req.params.categoryId, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error retrieving products"
			});
		} else {
			res.send(data);
		}
	});
}

// Update a Category identified by the CategoryId in the request
exports.update = (req, res) => {
	console.log("Parametri", req.query.name);
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	Category.updateById(
		req.params.categoryId,
		new Category(req.query),
		(err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Category with id ${req.params.categoryId}.`
					});
				} else {
					res.status(500).send({
						message: "Error updating Category with id " + req.params.categoryId
					});
				}
			} else res.send(data);
		}
	);
};

// Delete a Category with the specified CategoryId in the request
exports.delete = (req, res) => {
	Category.remove(req.params.categoryId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Category with id ${req.params.categoryId}.`
				});
			} else {
				res.status(500).send({
					message: "Could not delete Category with id " + req.params.categoryId
				});
			}
		} else res.send({message: `Category was deleted successfully!`});
	});
};

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {

};
