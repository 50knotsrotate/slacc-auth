/*
    ENDPOINT(S): POST /signin
    
    PURPOSE: This middleware function is used to check the USERS table to make sure the POSTed username
    and password exist in the record. This function is very similar to checkUniqueUsername middleware,
    the only difference being we dont send an error if we find a user, we throw an error of we DONT
    find a user.
*/

// Dependencies
const bcrypt = require("bcryptjs");

async function checkUniqueUsername(req, res, next) {
  const db = req.app.get("db");

  const { username, password } = req.body;

  db.query(`SELECT * FROM USERS WHERE USERS.USERNAME = '${username}'`).then(user => {
    if (user.length) {
      const isCorrectPassword = bcrypt.compareSync(password, user[0].password);
      if (isCorrectPassword) {
        next();
      } else {
        const err = new Error();
        err.statusCode = 400;
        err.message = "That password is incorrect";
        next(err);  
      }
    } else {
       const err = new Error();
       err.statusCode = 400;
       err.message = "Uh oh, looks like we cant find you. Double check your username.";
       next(err); 
    }
  });
}

module.exports = checkUniqueUsername;
