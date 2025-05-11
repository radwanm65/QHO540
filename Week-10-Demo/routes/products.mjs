// routes/product.mjs 

import express from 'express';
const productRouter = express.Router();

productRouter.get('/all', (req,res)=> {
    // code to return all products
    console.log("I am within the code of products/all");
});

productRouter.get('/id/:id', (req,res)=> {
    // code to find the product with the given ID
    console.log("I am within the code of products/id/ID");
});

export default productRouter; // export the module for external use