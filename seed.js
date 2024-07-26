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
        let count = 0;
        // console.log(Array.isArray(products))
        const queries = products.map(async(product) => {
            count++;

            const product_id = product.id;
            const product_name = product.title;
            const price = product.price;
            const brand = product.brand;
            const category = product.category;
            const review = product.reviews[0];
            // console.log(count, product)
            let qry =
                `INSERT INTO products(id, name, price, brand, category, review)
                VALUES
                    ($1,$2,$3,$4,$5,$6);
                 `
            let vals = [count, product_name, price, count, count, count]
            await client.query(qry, vals);

            qry = `INSERT INTO categories(name)
                VALUES ($1);`
            vals = [category]
            await client.query(qry, vals);

            qry = `INSERT INTO brands(name)
                VALUES ($1);`

            await client.query(qry, [brand]);
            qry = `INSERT INTO reviews(id, review_txt)
                VALUES
                    ($1), ($2)`
            await client.query(qry, [product_id, review]);
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