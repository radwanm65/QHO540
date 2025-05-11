export default function logger(req, res, next) {
    console.log(`Received a request for ${req.originalUrl} at ${new Date().toLocaleString()}.`);
    next();
}