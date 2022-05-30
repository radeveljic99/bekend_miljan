const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer');


const app = express();

const storage = multer.diskStorage({
    destination: './img/',
    filename: (req, file, cb) => {
        const fileName = req.body.name
        cb(null, fileName)
    }
}) ;

const upload = multer({storage: storage}) ;

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use(cors());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route

app.post('/addPicture', upload.single('file'), (req, res) => {
    res.status(200).send;
});


require("./app/routes/category.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/cart.routes.js")(app);


app.use("/img", express.static('img'));

// set port, listen for requests
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});
