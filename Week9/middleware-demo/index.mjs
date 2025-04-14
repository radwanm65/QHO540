import express from 'express';
const app = express();

app.use( (req,res,next) => {
    console.log(`Received a request at ${new Date().toLocaleString()}`);
    next();
});


// Note that middleware only runs with /search/:query route
app.use( '/search/:query', (req,res,next) => {
    console.log(`Received a request at ${new Date().toLocaleString()}`);
    next();
});

// Middleware not called
app.get('/', (req,res) => {
    res.send(`Hello world!`);
});

// Middleware called
app.get('/search/:query', (req,res) => {
    res.send(`Searching for ${req.params.query}...`);
});


// This middleware will only run with POST requests, due to the use of
// app.post() rather than app.use()
// * means 'match all', so this middleware will run with all POST requests
app.post( '*', (req,res,next) => {
    console.log(`Received a POST request at ${new Date().toLocaleString()}`);
    next();
});

// Middleware called, because it uses post()
app.post('/product/new', (req,res) => {
    // Code to add a product to the database
});

app.listen(3000);