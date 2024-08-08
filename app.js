const express = require('express')
const app = express()
const cors = require("cors");

app.use(express.json())


function validateId(req, res, next) {
    console.log("Testing middleware!")

    let id = req.params.id
    if (id >= 0 && id < products.length) {
        next()
    }

    res.status(404).send(`The id, ${id}, you have sent us is invalid!!`)
}

// condition
let products = [
    {
        name: "Gibson les paul 4 sale",
        price: 50000,
        brand: "Gibson",
        model: "les paul",
        description: "Selling my grandfathers gibson from the 50's. I know what i have!!!"
    },
    {
        name: "old ibanez",
        price: 500,
        brand: "Ibanez",
        model: "LMDO9039880",
        description: "Selling my first guitar"
    },
    {
        name: "Selling indoor drumming kit",
        price: 450,
        brand: "Mitchell",
        model: "ghfj98793",
        description: "Perfect for those who live in an apartment but still want to rock."
    }
]

app.get("/products", async (req, res) => {
    let productsDB = await db.any("SELECT * FROM products")
    res.status(200).json({success: true, data: productsDB})
})

// /products/0, /products/1, /products/2, 
app.get("/products/:id", validateId, async (req, res) => {
    console.log("Start of main function body")
    try {
        let productId = req.params.id
        let product = await db.oneOrNone("SELECT * FROM products WHERE id=$1", productId)
        res.status(200).json({success: true, data: product})
    } catch(err) {
        res.status(500).json({success: false, data: err})
    }
})

app.post("/products/new", validateBody, async (req, res) => {
    let body = req.body
    console.log(req, 'THIS SHOULD BE THE BODY')
    try {
        let product = await db.oneOrNone("INSERT INTO products (name, price, brand, model, description, condition) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [body.name, body.price, body.brand, body.model, body.description, body.condition])
        res.status(201).json({success: true, data: product})
    } catch(err) {
        res.status(500).json({success: false, data: err})
    }
})

app.put("/products/:id", validateId, validateBody, async (req, res) => {
    console.log("testing start of update route")
    let id = req.params.id
    let body = req.body

    try {
        let updatedProduct = await db.oneOrNone("UPDATE products SET name=$1, price=$2, brand=$3, model=$4, description=$5, condition=$6 WHERE id=$7 RETURNING *", [
            body.name,
            body.price,
            body.brand,
            body.model,
            body.description,
            body.condition, 
            id
        ])
        res.status(201).json({success: true, data: updatedProduct})
    } catch (err) {
        res.status(500).json({success: false, data: err})
    }

})

app.delete("/products/:id", validateId, async (req, res) => {
    let id = req.params.id

    try {
        let deletedProduct = await db.oneOrNone("DELETE FROM products WHERE id=$1 RETURNING *", id)
        res.status(200).json({success: true, data: deletedProduct})
    } catch (error) {
        res.status(500).json({success: false, data: err})
    }
})







app.get("*", (req, res) => {
    res.send("<h1>THE PAGE YOU HAVE REQUESTED IS OUTSIDE OF THE SCOPE OF THIS PROJECT<h1>")
})

module.exports = app;