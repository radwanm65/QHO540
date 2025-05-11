import express from 'express';
const productRouter = express.Router();
import db from '../db.mjs';

productRouter.get('/all', (req,res)=> {
    console.log("Products ALL ROUTE has been called");
    // code to return all products
});

productRouter.get('/', (req,res)=> {
    console.log("Products Home Page ROUTE has been called");
    // code to return all products
});

productRouter.get('/id/:id', (req,res)=> {
    // code to find the product with the given ID
    console.log("Products ID/ID ROUTE has been called");
});
productRouter.post('/id/:id', (req,res)=> {
    // code to find the product with the given ID
    console.log("Products ID/ID ROUTE has been called");
});

export default productRouter; // export the module for external use