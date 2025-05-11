import express from 'express';
const songsRouter = express.Router();
import db from '../db.mjs';


songsRouter.get('/all', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs');
        const results = stmt.all();
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Buy a song with a given ID
songsRouter.post('/song/:id/buy', (req, res) => {
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
songsRouter.delete('/song/:id', (req, res) => {
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
songsRouter.post('/song/create', (req, res) => {
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


export default songsRouter; // export the module for external use

