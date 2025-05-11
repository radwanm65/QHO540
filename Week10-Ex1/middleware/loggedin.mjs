// Modify this middleware to check logged in user and return True or False

export default function logger(req, res, next) {
    console.log(`Received a request for ${req.originalUrl} at ${new Date().toLocaleString()}.`);
    console.log('USER'+req.session.username);
    /*
    if(req.session.username) { console.log("Ligitimate User");
        next();
    } else {
        console.log ("You're not logged in. Go away!");
    }
        */
    next();
}
    