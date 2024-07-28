const { Router } = require("express");
const productController = require('../controllers/productController.js');
const categoryController = require('../controllers/categoryController.js');
const db = require('../db/productQueries');
const productRouter = Router();





module.exports = productRouter;