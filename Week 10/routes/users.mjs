import express from 'express';
const usersRouter = express.Router();

usersRouter.get('/all', (req,res)=> {
    console.log("Products ALL the Users from a Database");
    // code to return all products
});
usersRouter.get('/login', (req,res)=> {
    console.log("Login Users");
    // code to return all products
});
usersRouter.get('/logout', (req,res)=> {
    console.log("Users Logging Out");
    // code to return all products
});

export default usersRouter; // export the module for external use
