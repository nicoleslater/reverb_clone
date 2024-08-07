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

app.get('/', (req, res) => {
    res.send("<div><h1>Welcome to our reverb_clone!<h1><p>Please feel free to make requests to any of these routes:\n GET: '/'<p><div>")
})



app.get("/products", (req, res) => {
    res.send(products)
})

// /products/0, /products/1, /products/2, 
app.get("/products/:id", validateId, (req, res) => {
    console.log("Start of main function body")
    try {
        let productId = req.params.id
        res.status(200).send(products[productId])
    } catch(err) {
        res.status(500).send(err)
    }
})

app.post("/products/new", (req, res) => {
    let body = req.body
    console.log(req, 'THIS SHOULD BE THE BODY')
    if (body.name && body.price) {
        products.push(body)
        res.send("Product successfuly made!")
    } else {
        res.send("Product not successfully made")
    }
})

app.put("/products/:id", validateId, (req, res) => {
    console.log("testing start of update route")
    let id = req.params.id
    let body = req.body

    if (body.name && body.price && body.brand && body.model && body.description) {
        products[id] = {
            name: body.name,
            price: body.price,
            brand: body.brand,
            model: body.model,
            description: body.description
        }
        res.send(products[id])
    } else {
        res.send("YOU WERE MISSING SOME INFORMATION!! TRY AGAIN HACKERZ")
    }

})

app.delete("/products/:id", validateId, (req, res) => {
    let id = req.params.id

    products.splice(id)
    res.send(products)
})







app.get("*", (req, res) => {
    res.send("<h1>THE PAGE YOU HAVE REQUESTED IS OUTSIDE OF THE SCOPE OF THIS PROJECT<h1>")
})

module.exports = app;