const db = require("../db/productQueries");


async function createProductGet(req, res) {
    res.render("productForm", { edit: false })
}

async function createProductPost(req, res) {

    const { name, price, category } = req.body;
    await db.createProduct(name, price, category);
    res.redirect("/categories/");
}


async function updateProductPost(req, res) {
    const { id } = req.params;
    const { name, price, category } = req.body;
    await db.updateProduct(id, name, price, category);
    res.redirect("/categories");
}
async function updateProductGet(req, res) {
    const { id } = req.params;
    const product = await db.findProductObjById(id);
    console.log("product", product)
    res.render("productForm", { product: product[0], edit: true });
}
async function deleteProduct(req, res) {
    const { id } = req.params;
    await db.deleteProduct(id);
    res.redirect("/categories");
}


module.exports = {

    createProductGet,
    createProductPost,
    deleteProduct,
    updateProductGet,
    updateProductPost
};