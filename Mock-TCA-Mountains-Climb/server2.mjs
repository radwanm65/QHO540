import express from 'express'; 
const app = express();
import Database from 'better-sqlite3';

app.use(express.json());

const db = new Database("tourist.db");

// "climb search" route
// Q4 complete the route to find all climbs of the user's chosen difficulty

app.get('/climbSearch/:diff', (req, res) => {
    const stmt = db.prepare("SELECT * FROM ???? WHERE ????");

    // Q5 complete to return the details as JSON 

});

// Q7 complete the route to allow user to "like" the climb. It should
// increase the likes by one. 
app.post('/like/:climbId', (req, res) => {
     const stmt = db.prepare("UPDATE ????");
});

// "add climb" route
app.post('/addClimb', (req, res) => {
    
    // Q11 Change the “add climb” route so that it sends back an appropriate HTTP 
    // status code if the mountain height or route distance is 0 or less.  See the 
    // Assessment Brief Paper for a hint!

    // Q10 complete the addClimb route as described on the Assessment Brief Paper
    const stmt = db.prepare("INSERT INTO ????");
});

// Q14 complete the login route on the server
app.post('/login', (req, res) => {
        // ?????
});

*/

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(3000);



