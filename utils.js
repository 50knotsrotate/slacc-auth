/*
    This function takes a middleware as an argument and wraps it in a promise. 
    It will catch any 'silent' errors that could crash the server (No connection to DB, for example)
    This is a temporary fix until express 5 is released, where async errors
    will be handled automatically.

    This function must wrap any middleware that that uses async/await. 
*/

module.exports =  function asyncMiddleware(fn) { 
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(_err => { 
            res.boom.badRequest('Uh oh! Something went wrong on our end. Try again.');
        });
     }
};