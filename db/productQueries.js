 const pool = require("./pool");



 async function createProduct(name, price, category) {

     console.log('name', name, 'price', price, 'category', category)


     const qry = `INSERT INTO products(name,price,category) VALUES ($1,$2,$3);`
     const vals = [name, price, category]
     await pool.query(qry, vals);

 }
 async function updateProduct(id, name, price, category) {


     const qry = `UPDATE products SET name=$1,price=$2,category=$3 where id =$4`;

     const vals = [name, price, category, id];
     await pool.query(qry, vals);
 }
 async function findProductById(id) {
     const { rows } = await pool.query("SELECT name FROM products where id=$1", [id]);
     return rows;
 }
 async function findProductObjById(id) {
     const { rows } = await pool.query("SELECT * FROM products where id=$1", [id]);
     return rows;
 }
 async function deleteProduct(id) {
     const qry = `DELETE FROM products WHERE id=($1)`;
     await pool.query(qry, [id]);
 }


 module.exports = {

     createProduct,
     updateProduct,
     deleteProduct,
     findProductById,
     findProductObjById
 };