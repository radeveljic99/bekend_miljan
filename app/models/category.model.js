const sql = require('./db.js');

const Category = function (category) {
	this.name = category.name;
};

Category.create = (newCategory, result) => {
	sql.query("INSERT INTO category SET ? ", newCategory, (err, res) => {
		if (err) {
			console.log('error in create: ', err);
			result(err, null);
			return;
		}
		console.log("created category: ", {id: res.insertId, ...newCategory});
		result(null, {id: res.insertId, ...newCategory});
	});
};

Category.findById = (categoryId, result) => {
	sql.query(`SELECT * FROM category WHERE id = ${categoryId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log("found category: ", res[0]);
			result(null, res[0]);
			return;
		}
		result({kind: "not_found"}, null);
	});
};

Category.findPage = (categoryId, page, productsPerPage, result) => {
	sql.query('SELECT * FROM product WHERE category_id = ?  LIMIT ? OFFSET ?',
		[parseInt(categoryId), parseInt(productsPerPage), (page - 1) * parseInt(productsPerPage)],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.length >= 0) {
				result(null, res);
				return;
			}
			result({kind: "not_found"}, null);
		});
}


Category.findAllProducts = (categoryId, result) => {
	console.log('query called');
	sql.query("SELECT * FROM product WHERE category_id = ?", categoryId, (err, res) => {
		console.log('vuksan');
		console.log(res);
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};

Category.getAll = result => {
	sql.query("SELECT * FROM category", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("categories: ", res);
		result(null, res);
	});
};

Category.firstCategory = result => {
	sql.query("SELECT * FROM category limit 1", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		console.log("categories: ", res);
		result(null, res);
	})
}

Category.updateById = (id, category, result) => {
	sql.query(
		'UPDATE category SET name = ? WHERE id = ?',
		[category.name, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}
			if (res.affectedRows == 0) {
				result({kind: "not_found"}, null);
				return;
			}
			console.log("updated category: ", {id: id, ...category});
			result(null, {id: id, ...category});
		}
	);
};


Category.remove = (id, result) => {
	sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			result({kind: "not_found"}, null);
			return;
		}

		console.log("deleted category with id: ", id);
		result(null, res);
	});
};

Category.removeAll = result => {
	sql.query("DELETE FROM category", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} categories`);
		result(null, res);
	});
};

Category.countProducts = (categoryId, result) => {
	sql.query("SELECT COUNT(*) AS broj_proizvoda FROM product WHERE category_id =  ? ", categoryId, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		console.log("number of products : ", res[0]);
		result(null, res[0]);
	})
}

module.exports = Category;

