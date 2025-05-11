// routes/users.mjs 
import express from 'express';
const usersRouter = express.Router();


usersRouter.post('/login', (req, res) => {
    if(req.body.username == 'SimonSmith' && req.body.password == 'secret' ) {
        req.session.username = req.body.username; 
        res.json({username: req.body.username});
    } else {
        res.status(401).json({error: "Incorrect login!"});
    } 
});

// Logout route
usersRouter.post('/logout', (req, res) => {
    req.session = null;
    res.json({loggedout: true});
});

// 'GET' login route - useful for clients to obtain currently logged in user
usersRouter.get('/login', (req, res) => {
    res.json({username: req.session.username || null} );
});

export default usersRouter; // export the module for external use
