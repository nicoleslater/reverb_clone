const db = require("../db/dbConfig");

const getAllProducts = async () => {
   try{
        const allProducts = await db.any("SELECT * FROM products");
        return allProducts
     } catch(err){
        return err
     }
};

const getOneProduct = async (id) => {
    // try & catch db.one
    try{
        const oneProduct = await db.one("SELECT * FROM products WHERE id=$1", id)
        return oneProduct
    } catch(error){
        return error
    }
};

const deleteProduct = async (id) => {
    // try & catch db.one
    try{
        const deletedProduct = await db.one(
            "DELETE from products WHERE id = $1 RETURNING *",
            id
        );
        return deletedProduct
    } catch(error){
        return error
    }
};

const updateProduct = async (id, product) => {
    // try & catch db.one
    try{
        const { name, price, brand, model, description, condition} = product;
        const updatedProduct = await db.one(
            "UPDATE products SET name=$1, price=$2, brand=$3, model=$4, description=$5, condition=$6, WHERE id=$7 RETURNING *",
            [name, price, brand, model, description, condition, id]
        );
        return updatedProduct
    } catch(err){
        return err
    }
};

module.exports = {
    getAllProducts, 
    getOneProduct, 
    deleteProduct,
    updateProduct
}