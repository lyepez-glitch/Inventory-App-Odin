const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}
async function getCatProducts(name) {
    console.log("name", name)
    const { rows } = await pool.query("SELECT * FROM products WHERE category = $1", [name]);
    return rows;
}

async function findCatByName(name) {
    const { rows } = await pool.query("SELECT * FROM categories where name=$1", [name]);
    return rows;
}
async function findCatById(id) {
    const { rows } = await pool.query("SELECT name FROM categories where id=$1", [id]);
    return rows;
}
async function createCategory(newCat) {


    const qry = `INSERT INTO categories(name) VALUES ($1);`


    await pool.query(qry, [newCat]);
}
async function updateCategory(id, name) {


    const qry = `UPDATE categories SET name=($1) where id=$2`;


    const cat = await findCatById(id);
    console.log('cat=>', cat[0].name);
    const og = cat[0].name;

    const linkedProds = await getCatProducts(og);
    await pool.query(qry, [name, id]);

    console.log("linkedProds", linkedProds)
    const queries = linkedProds.map(async(product) => {
        console.log("name", name, "og", og)
        const qry = `UPDATE products SET category=$1 WHERE category = $2 and name=$3`;
        const updated = await pool.query(qry, [name, og, product.name]);
        console.log("updated", updated)
    })
    const result = await Promise.all(queries);
    console.log("result", result)



}
async function deleteCategory(id) {
    const qry = `DELETE FROM categories WHERE id=($1)`;


    try {
        const result = await pool.query(qry, [id]);

    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCatProducts,
    findCatByName,
    findCatById
};