export default function myCors(allowedClient) {

    const corsMiddleware = (req, res, next) => {
       res.set('Access-Control-Allow-Origin', allowedClient);
       next();
    }    
    return corsMiddleware;
}