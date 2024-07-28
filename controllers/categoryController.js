const db = require("../db/categoryQueries");

const prodDB = require("../db/productQueries");
async function getCategories(req, res) {
    const categories = await db.getAllCategories();

    const cats = [];
    const nonDuplicates = [];
    categories.forEach(async(category) => {
        if (!nonDuplicates.includes(category.name)) {
            nonDuplicates.push(category.name)
            cats.push(category)
        } else {
            await db.deleteCategory(category.id);
        }
    })

    res.render("catIndex", { categories: cats })
}

async function getCatProducts(req, res) {
    const { name } = req.query;
    const prods = [];
    const nonDuplicates = [];
    const products = await db.getCatProducts(name);
    // products.forEach(async(product) => {
    //     if (!nonDuplicates.includes(product.name)) {
    //         nonDuplicates.push(product.name)
    //         prods.push(product)
    //     } else {
    //         await prodDB.deleteProduct(product.id);
    //     }
    // })
    console.log("products", products)
    res.render("productIndex", { products: products, edit: false })
}


async function createCategoryGet(req, res) {
    res.render("categoryForm", { edit: false })
}

async function createCategoryPost(req, res) {

    const { newCat } = req.body;

    await db.createCategory(newCat);
    res.redirect("/categories");
}
async function updateCategoryPost(req, res) {

    const { category } = req.body;
    const { id } = req.params;
    await db.updateCategory(id, category);
    res.redirect("/categories");
}
async function updateCategoryGet(req, res) {
    const { id } = req.params;
    const cat = await db.findCatById(id);
    console.log(60, cat, id)

    res.render("categoryForm", { category: cat[0], id: id, edit: true });
}
async function deleteCategory(req, res) {
    const { id } = req.params;
    console.log("id to delete", id)
    await db.deleteCategory(id);
    const categories = await db.getAllCategories();
    const findItem = await db.findCatById(id)
    console.log("findItem", findItem);



    res.redirect("/categories");

}


module.exports = {
    getCategories,
    getCatProducts,
    createCategoryGet,
    createCategoryPost,
    deleteCategory,
    updateCategoryGet,
    updateCategoryPost
};