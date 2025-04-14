import express from 'express';
import Database from 'better-sqlite3';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Create sqlite database to store sessions 
const sessDb = new Database('session.db');

// create on object for creating the session store
// SqliteStore is similar in concept to a class
const SqliteStore = betterSqlite3Session(expressSession, sessDb);

app.use(expressSession({
    // Specify the session store to be used.
    store: new SqliteStore(), 

    // a secret used to digitally sign session cookie, use something unguessable (e.g. random bytes as hex)
    // in a real application.
    secret: 'BinnieAndClyde', 

    // see the documentation for more details, the value you should set it to depends on the inner workings of your session store.
    // For express-session-better-sqlite3, it should be true.
    resave: true, 

    // saves session to store before data is stored in the session 
    // (disabled as this unnecessarily saves empty sessions in the database)
    saveUninitialized: false, 

    // reset cookie for every HTTP response.
    // The cookie expiration time will be reset, to 'maxAge' milliseconds beyond the time of the response.
    // Thus, the session cookie will expire after 10 mins of *inactivity* 
    // (no HTTP request made and consequently no response sent) when 'rolling' is true.
    // If 'rolling' is false, the session cookie would expire after 10 minutes even if the user was active, 
    // which would be very annoying - so true is the sensible setting.
    rolling: true, 

    // destroy session (remove it from the data store) when it is set to null, deleted etc
    unset: 'destroy', 

    // useful if using a proxy to access your server, as you will probably be doing in a production environment: 
    // this allows the session cookie to pass through the proxy
    proxy: true, 

    // properties of session cookie
    cookie: { 
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));

// Login route
app.post('/login', (req, res) => {
    if(req.body.username == 'SimonSmith' && req.body.password == 'secret' ) {
        req.session.username = req.body.username; 
        res.json({username: req.body.username});
    } else {
        res.status(401).json({error: "Incorrect login!"});
    } 
});

// Logout route
app.post('/logout', (req, res) => {
    req.session = null;
    res.json({loggedout: true});
});

// 'GET' login route - useful for clients to obtain currently logged in user
app.get('/login', (req, res) => {
    res.json({username: req.session.username || null} );
});

//Middleware
app.post('/addProduct', (req, res) => {
    if(req.session.username == null) {
        res.status(401).json({error: "You're not logged in. Go away!"});
    } else {
        console.log("Successfully Added Product");
        // code to add a product to the database
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  