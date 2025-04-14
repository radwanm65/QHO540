import express from 'express';
const app = express();

// Middleware not called
app.get('/', (req,res) => {
    res.send(`Hello world!`);
});

// Middleware called, because it uses post()
app.post('/product/new', (req,res) => {
    // Code to add a product to the database
    res.send(`Code to add a product to the database`);
});

// Using multiple middleware with one statement

app.use( '/testroute', (req, res, next) => {
    console.log('Running middleware 1')
    next();
},
 (req, res, next) => {
    console.log('Running middleware 2')
    next();
} 
);

// Middleware which protects any routes using POST or DELETE from access by users who are are not logged in
app.use( (req, res, next) => {
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        console.log("Delete or Post are not allowed");
        next();
    } else {
        if(req.session.username) { 
            next();
        } else {
            res.status(401).json({error: "You're not logged in. Go away!"});
        }
    }
});

app.listen(3000);