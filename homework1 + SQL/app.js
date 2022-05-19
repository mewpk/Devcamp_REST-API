const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise")
const cors = require("cors")


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.get("/api/product/:id", async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุใหถูกตอง
        password: '1234', // <== ระบุใหถูกตอง
        database: 'stock', // <== ระบุ database ใหถูกตอง
        port: 3306, // <== ใส port ใหถูกตอง (default 3306, MAMP ใช 8889)
    })
    try {
        const id = req.params.id;
        const data = await connection.query(` 
       select * from items where id = ${id}`);
        res.json(
            data[0]
        );
        await connection.end();
    } catch (error) {
        res.json(error);
    }

})

app.post("/api/product/", async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุใหถูกตอง
        password: '1234', // <== ระบุใหถูกตอง
        database: 'stock', // <== ระบุ database ใหถูกตอง
        port: 3306, // <== ใส port ใหถูกตอง (default 3306, MAMP ใช 8889)
    })
    try {
        let count = await connection.query(` 
       select count(*) as some from items `);

        // res.send(count[0].some)
        count = count[0][0].some
        count +=1
        const data = await connection.query(`insert into items (id, product_name, stock_left,category) value (${count},"${req.body.product_name}","${req.body.stock_left}","${req.body.category}")`);
        res.json({
            status: "success",
            id : count
        }

        );
        await connection.end();
    } catch (error) {
        res.json(error);
    }

})

app.put("/api/product/:id", async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุใหถูกตอง
        password: '1234', // <== ระบุใหถูกตอง
        database: 'stock', // <== ระบุ database ใหถูกตอง
        port: 3306, // <== ใส port ใหถูกตอง (default 3306, MAMP ใช 8889)
    })
    try {
        const id = req.params.id;
        const data = await connection.query(`update items set product_name = "${req.body.product_name}", stock_left = "${req.body.stock_left}" , category = "${req.body.category}" where id = ${id}`);

        res.json({
            status: "success",
            id : id
        }

        );
        await connection.end();
    } catch (error) {
        res.json(error);
    }

})

app.delete("/api/product/:id", async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุใหถูกตอง
        password: '1234', // <== ระบุใหถูกตอง
        database: 'stock', // <== ระบุ database ใหถูกตอง
        port: 3306, // <== ใส port ใหถูกตอง (default 3306, MAMP ใช 8889)
    })
    try {
        const id = req.params.id;
        const data = await connection.query(`delete from items where id = ${id};`);

        res.json({
            status: "success",
            id : id
        }

        );
        await connection.end();
    } catch (error) {
        res.json(error);
    }

})


app.listen(3000, () => {
    console.log("Listen PORT ----> 3000")
})