module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
    app.get('/cartProducts/:userId', carts.findCartProducts);
    app.post('/cartProducts', carts.create);
    app.delete('/cartProducts/:productId', carts.delete);
    app.delete('/cartProducts/users/:userId', carts.deleteUser);
}


