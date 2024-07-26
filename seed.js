// #! /usr/bin/env node
require('dotenv').config();
const axios = require('axios');
const { Client } = require("pg");

let SQL = '';

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.ROLE}:${process.env.password}@localhost:${process.env.PORT}/${process.env.DATABASE}`,
    });
    await client.connect();

    console.log("done");
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=100');
        console.log('response', response.data);
        const products = response.data["products"];

        // console.log(Array.isArray(products))
        const queries = products.map(async(product) => {


            const product_id = product.id;
            const product_name = product.title || "none";
            const price = parseInt(product.price) || 0;
            const brand = product.brand || "none";
            const category = product.category || "none";
            const review = product.reviews[0] || "none";
            // console.log(product_id, product)


            let qry = `INSERT INTO categories(id,name)
                VALUES ($1,$2);`
            let vals = [product_id, category]
            await client.query(qry, vals);

            qry = `INSERT INTO brands(id,name)
                VALUES ($1,$2);`

            await client.query(qry, [product_id, brand]);
            qry = `INSERT INTO reviews(id, review_txt)
                VALUES
                    ($1,$2);`
            await client.query(qry, [product_id, review]);

            qry =
                `INSERT INTO products(id, name, price, brand, category, review)
                VALUES
                    ($1,$2,$3,$4,$5,$6);
                 `
            console.log("prod id", product_id)
            vals = [product_id, product_name, price, product_id, product_id, product_id]
            await client.query(qry, vals);
        })

        await Promise.all(queries);




    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        try {
            await client.end();
        } catch (e) {
            console.log('err', e.message)
        }

    }
}

main();