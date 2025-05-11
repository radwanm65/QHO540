// db.mjs - initialise and export the database connection object
import Database from 'better-sqlite3';
import 'dotenv/config';

const dbname=process.env.DB_DBASE;
console.log("Database Name ", dbname);
const db = new Database(dbname);
export default db;