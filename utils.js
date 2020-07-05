/*
    This function takes a middleware as an argument and wraps it in a promise. 
    Async errors (rejected promises) are not caught by express in v4. 
    For example, if I lost my connection to the DB, and tried to query it,
    this would crash my server. 
*/

export default function asyncMiddleware(fn) { 
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
     }
};