import express from 'express';
const app = express();
import 'dotenv/config';

import productRouter from "./routes/product.mjs";
import logger from './middleware/logger.mjs';
import myCors from './middleware/mycors.mjs';
import db from './db.mjs';
import usersRouter from './routes/users.mjs';

import mysql from 'mysql';

app.use(logger);
app.use(myCors('http://localhost:5173'));
app.use('/users', usersRouter);
app.use('/products', productRouter);


console.log("host " + process.env.DB_HOST+" user: "+process.env.DB_USER+" database: "+process.env.DB_DBASE);

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DBASE,
    password: process.env.DB_PWD
});

app.listen(3000);