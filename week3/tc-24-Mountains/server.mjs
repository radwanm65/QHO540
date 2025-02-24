
import express from 'express'; 
const app = express();
import Database from 'better-sqlite3';
import session from "express-session";

app.use(express.json());
app.use(express.static('public'));

const db = new Database("tourist.db");

    app.get('/climbSearch/:diff', (req, res) => {
        console.log(req.params.diff);
            const stmt = db.prepare("SELECT * FROM mt_mountains where difficulty=?");
            var results = stmt.all(req.params.diff);   
            console.log(JSON.stringify(results));
            res.json(results);
        
    });

    app.get('/', (req, res) => {
        const sess = req.session;
        res.sendFile('index.html');
    });
    
    app.listen(3000,()=>{
        console.log('server is online.');
    
    });
  
