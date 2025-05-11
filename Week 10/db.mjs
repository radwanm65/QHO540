// db.mjs - initialise and export the database connection object
import Database from 'better-sqlite3';
const db = new Database("wadsongs.db");

export default db;