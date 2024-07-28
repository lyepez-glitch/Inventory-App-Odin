const { Router } = require("express");
const productController = require('../controllers/productController.js');
const categoryController = require('../controllers/categoryController.js');

const catRouter = Router();
catRouter.get("/", categoryController.getCategories);
catRouter.get("/products", categoryController.getCatProducts);
catRouter.get("/new", categoryController.createCategoryGet);
catRouter.post("/new", categoryController.createCategoryPost);
catRouter.get("/edit/:id", categoryController.updateCategoryGet);
catRouter.post("/edit/:id", categoryController.updateCategoryPost);
catRouter.get("/delete/:id", categoryController.deleteCategory);
catRouter.get("/products/new", productController.createProductGet);
catRouter.post("/products/new", productController.createProductPost);
catRouter.get("/products/edit/:id", productController.updateProductGet);
catRouter.post("/products/edit/:id", productController.updateProductPost);
catRouter.get("/products/delete/:id", productController.deleteProduct);
module.exports = catRouter;