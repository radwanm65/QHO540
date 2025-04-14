import express from 'express'; 
const app = express();
import Database from 'better-sqlite3';

app.use(express.static('public'));
import bodyParser from "body-parser";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

import session from "express-session";

app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );
  
const db = new Database("restaurants.db");

app.get("/", (req, res) => {
    const sess = req.session;
    res.sendFile("index.html");
  });

app.get('/searchLocation/:location', (req,res)=> {
    // res.send('Search for restairants ina given location!');
    try {
        const stmt = db.prepare("SELECT * FROM restaurants WHERE location=?");
        const results = stmt.all(req.params.location);
        res.json(results);
    } catch(error) {
        res.status(500).json({ error: error });
    }
});

app.get('/search', (req, res) => {
    const location = req.query.location;
    const type = req.query.type;
    try {
        const stmt = db.prepare("SELECT * FROM restaurants WHERE (location=? and type=?)");
        const results = stmt.all(location,type);
        res.json(results);
    } catch(error) {
        res.status(500).json({ error: error });
    }
});

// Login Route (API End Point)

app.post("/login", (req, res) => {
    const stmt = db.prepare(
      "SELECT * from users where username=? and password=?"
    );
    const results = stmt.all(req.body.username, req.body.password);
    //console.log(req.body.username, req.body.password);
   
    if (results.length < 0) {
      res.status(500).json({ error: "Internal error" });
    } else if (results.length > 0) {
     console.log("USER MATCH");
      const sess = req.session;
      sess.username = results[0].username;
      sess.admin = results[0].admin == 1 ? true : false;
      res.json({ success: 1 });
    } else {
      res
        .status(400)
        .json({ error: "Unable to login!. Check your username and password" });
    }
  });
  
  
  app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
      const info = stmt.run(username, password);
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: info.lastInsertRowid,
          username,
        },
      });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ message: 'User is already registered' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  });
  

app.listen(3000);