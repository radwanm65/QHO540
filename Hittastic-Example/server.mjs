// Solution to the standard exercises for week 2

/*
 * PLEASE NOTE:
 *
 * You can use this code to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */

// Import dependencies
import express from 'express';
import Database from 'better-sqlite3';
import ViteExpress from 'vite-express';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

// Create our Express server.
const app = express();

// Enable reading JSON from the request body of POST requests
app.use(express.json());

// Access static content in the 'public' folder
app.use(express.static('public'));

// Load the database. You may need to change the path.
const db = new Database("wadsongs.db");

const sessDb = new Database("session.db");
const SqliteStore = betterSqlite3Session(expressSession, sessDb);

app.use(expressSession({
    store: new SqliteStore(), 
    secret: 'BinnieAndClyde', 
    resave: true, 
    saveUninitialized: false, 
    rolling: true, 
    unset: 'destroy', 
    proxy: true, 
    cookie: { 
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));

app.post('/login', (req, res) => {
    const stmt = db.prepare("SELECT * FROM ht_users WHERE username=? AND password=?");
    const row = stmt.get(req.body.username, req.body.password);
    console.log(req.body.username, req.body.password);
    if(row) {
        req.session.username = req.body.username;
        res.json({username: req.body.username});
    } else {
        res.status(401).json({error: "Invalid login!"});
    }
});

app.post('/logout', (req, res) => {
    req.session = null;
    res.json({loggedout: true});
});

app.use((req, res, next) => {
    if(["POST", "PUT", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if(req.session.username) {
            next();
        } else {
            res.status(401).json({error: "You're not logged in. Go away!"});
        }
    }
});

// Search by artist
app.get('/artist/:artist', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
        const results = stmt.all(req.params.artist);
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Search by title
app.get('/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=?');
        const results = stmt.all(req.params.title);
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Search by title and artist
app.get('/artist/:artist/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=? AND artist=?');
        const results = stmt.all(req.params.title, req.params.artist);
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Buy a song with a given ID
app.post('/song/:id/buy', (req, res) => {
    try {
        const stmt = db.prepare('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?');
        const info = stmt.run(req.params.id);
        if(info.changes == 1) {
            res.json({success: 1, id: req.params.id});
        } else {
            res.status(404).json({error: "No song with that ID"});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Delete a song with a given ID
app.delete('/song/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM wadsongs WHERE id=?');
        const info = stmt.run(req.params.id);
        if(info.changes == 1) {
            res.json({success: 1});
        } else {
            res.status(404).json({error: "No song with that ID"});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Add a song
app.post('/song/create', (req, res) => {
    try {
        if(req.body.title == "" || req.body.artist == "" || req.body.year == "" || req.body.price == "" || req.body.quantity == "") {
            res.status(400).json({error: "Blank fields"});
        } else {
            const stmt = db.prepare('INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES(?,?,?,0,?,?)');
            const info = stmt.run(req.body.title, req.body.artist, req.body.year, req.body.price, req.body.quantity);
            res.json({id: info.lastInsertRowid});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

const PORT = 3000;
ViteExpress.listen(app, PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
