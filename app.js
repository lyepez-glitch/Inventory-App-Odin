const express = require('express')
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController');

const app = express()
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser')
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/products", productRouter);

app.use("/categories", categoryRouter);










app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})