/* 
    ENDPOINT(S): POST /signup
    
    PURPOSE: This middleware function is used to check the USERS table to make sure the provided
    username does not already exist before creating a new record. I already set up a
    UNIQUE constraint in the USERS table, so it won't be allowed to happen anyway, 
    but using this middleware will make it easier for me to write a custom error message
    to the user in the event a username already taken, instead of the one
    that is thrown by massive.js, which looks like this:
    duplicate key value violates unique constraint \"users_username_key. 
    Ew.
*/

async function checkUniqueUsername(req, res, next) {
  const db = req.app.get("db");

  const { username } = req.body;


  /* 
    If the DB is queried for a user record with the provided username, 
    and an empty array is returned, it is a unique username and the 
    response can continue. If a record IS found, forward that error to the error handler
  */

   db.query(`SELECT * FROM USERS USERS WHERE USERS.USERNAME = '${username}'`)
    .then((user) => {
      if (user.length) {
        const err = new Error();
        err.statusCode - 400;
        err.message = 'Sorry, that username is taken.'
        next(err)
    } else {
      next();
    }
  });
}

module.exports = checkUniqueUsername;
