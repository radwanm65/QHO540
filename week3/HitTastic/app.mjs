import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const port = 3000;
const db = new Database('music.db');

app.use(express.json());
app.use(express.static('public'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(id)
  );
`);

// Create a new album
app.post('/albums', (req, res) => {
  const { title, artist } = req.body;
  const stmt = db.prepare('INSERT INTO albums (title, artist) VALUES (?, ?)');
  const info = stmt.run(title, artist);
  res.status(201).send({ id: info.lastInsertRowid, title, artist });
});


// Get all albums
app.get('/albums', (req, res) => {
  const albums = db.prepare('SELECT * FROM albums').all();
  res.send(albums);
});


// Get a specific album by Artist Name
app.get('/albums/:artist', (req, res) => {
  console.log(req.params.artist);
  const stmt = db.prepare("SELECT * FROM albums where artist=?");
  var results = stmt.all(req.params.artist);   
  res.json(results);
  console.log(results);
});

// Update an album by ID
app.put('/albums/:id', (req, res) => {
  const { title, artist } = req.body;
  const stmt = db.prepare('UPDATE albums SET title = ?, artist = ? WHERE id = ?');
  const info = stmt.run(title, artist, req.params.id);
  if (info.changes === 0) return res.status(404).send('Album not found');
  res.send({ id: req.params.id, title, artist });
});

// Delete an album by ID
app.delete('/albums/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM albums WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes === 0) return res.status(404).send('Album not found');
  res.status(204).send();
});

// Create a new song
app.post('/songs', (req, res) => {
  const { title, album_id } = req.body;
  const stmt = db.prepare('INSERT INTO songs (title, album_id) VALUES (?, ?)');
  const info = stmt.run(title, album_id);
  res.status(201).send({ id: info.lastInsertRowid, title, album_id });
});

// Get all songs
app.get('/songs', (req, res) => {
  const songs = db.prepare('SELECT * FROM songs').all();
  res.send(songs);
});

// Get a specific song by ID
app.get('/songs/:id', (req, res) => {
  const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(req.params.id);
  if (!song) return res.status(404).send('Song not found');
  res.send(song);
});

// Update a song by ID
app.put('/songs/:id', (req, res) => {
  const { title, album_id } = req.body;
  const stmt = db.prepare('UPDATE songs SET title = ?, album_id = ? WHERE id = ?');
  const info = stmt.run(title, album_id, req.params.id);
  if (info.changes === 0) return res.status(404).send('Song not found');
  res.send({ id: req.params.id, title, album_id });
});

// Delete a song by ID
app.delete('/songs/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM songs WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes === 0) return res.status(404).send('Song not found');
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});