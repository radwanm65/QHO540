import express from "express";
const app = express();
import Database from "better-sqlite3";
import session from "express-session";

const db = new Database("tourist.db");

app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Climb Search Route (API End Point)

app.get("/climbSearch/:diff", (req, res) => {
  
  const stmt = db.prepare("SELECT * FROM mt_mountains where difficulty=?");
  var results = stmt.all(req.params.diff);
  
  res.json(results);
});

// Climb Add Route (API End Point)

app.post("/addClimb", (req, res) => {
  // Q11 send back an error if the height or distance is 0 or less
  let sess = req.session;
  if (!sess.username) {
    res.status(401).json({ error: "User not logged in!" });
  } else if (!sess.admin) {
    res.status(401).json({ error: "Unauthorised access! Only Admin can add" });
  } else if (parseFloat(req.body.height) <= 0) {
    res.status(400).json({ error: "Invalid height!" });
  } else if (parseFloat(req.body.distance) <= 0) {
    res.status(400).json({ error: "Invalid distance!" });
  } else {
    // Q10 complete the route as described on the paper
    const stmt = db.prepare(
      "INSERT INTO mt_mountains (name, difficulty, height, distance) values (?, ?, ?, ?)"
    );
    const results = stmt.run(
      req.body.name,
      req.body.difficulty,
      parseFloat(req.body.height),
      parseFloat(req.body.distance)
    );

    if (!results) {
      res.status(500).json({ error: "Internal error" });
    } else {
      res.json({ success: 1 });
    }
  }
});

// Climb Like Route (API End Point)

app.post("/like/:mountainID", (req, res) => {

    let sess = req.session;
  if (!sess.username) {
    res.status(401).json({ error: "User not logged in!" });
  } else {
  //console.log(req.params.mountainID);
  const stmt1 = db.prepare("SELECT likes FROM mt_mountains where ID=?");
  var results = stmt1.all(req.params.mountainID);
  const oldLikes = results[0].likes;
  //console.log("Old Likes : ", results[0].likes);
  const newLikes = oldLikes + 1;
  const stmt = db.prepare("Update mt_mountains set likes=? where ID=?");
  var results = stmt.run(newLikes, req.params.mountainID);
  // console.log(JSON.stringify(results));
  res.json(results);}
});

// Climb Review Route (API End Point)

app.post("/review/:mountainID", (req, res) => {
  let sess = req.session;
  if (!sess.username) {
    res.status(401).json({ error: "User not logged in!" });
  } else {
  const stmt = db.prepare(
    "INSERT INTO mt_reviews (review, mountain_ID,username) values (?, ?,?)"
  );
  const results = stmt.run(
    req.body.review,
    req.params.mountainID,
    sess.username,
  );
  // console.log(JSON.stringify(results));
}
});

// Login Route (API End Point)

app.post("/login", (req, res) => {
  const stmt = db.prepare(
    "SELECT * from mt_users where username=? and password=?"
  );
  var results = stmt.all(req.body.user, req.body.password);

  if (results.length < 0) {
    res.status(500).json({ error: "Internal error" });
  } else if (results.length > 0) {
   // console.log("USER MATCH");
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

// Main Route (API End Point)

app.get("/", (req, res) => {
  const sess = req.session;
  res.sendFile("index.html");
});

// Server & Port Initialisation

app.listen(3000, () => {
  console.log("server is online Running at Port 3000.");
});
