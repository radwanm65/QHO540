import express from 'express';
const app = express();

// Import our product router module which we created above
import productRouter from './routes/product.mjs';

// Tell the app to use productRouter for all routes beginning with /products
// As we are using "use()", the router is acting as a middleware - see below
app.use('/products', productRouter);
app.listen(3000);