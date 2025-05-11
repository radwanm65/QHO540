import express from 'express';
import bodyParser from 'body-parser';

import studentRouter from './routes/student.mjs';

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/students', studentRouter);

app.listen(3000);