module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.get("/users/:userId",users.findOne);
    app.post("/users", users.create);
    app.get('/users/email/:email', users.findByEmail);
    app.put('/users/:userId/:balance', users.changeBalance);

}



