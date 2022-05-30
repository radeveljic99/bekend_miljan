module.exports = app => {
    const categories = require("../controllers/category.controller.js");

    app.post("/categories", categories.create);
    app.get("/categories", categories.findAll);
    app.get("/categories/first", categories.first);
    app.get("/categories/:categoryId", categories.findOne);
    app.get("/categories/:categoryId/products", categories.findProducts);
    app.get("/categories/:categoryId/numberOfProducts", categories.countProducts);
    app.put("/categories/:categoryId", categories.update);
    app.delete("/categories/:categoryId", categories.delete);
    app.delete("/categories", categories.deleteAll);
};
