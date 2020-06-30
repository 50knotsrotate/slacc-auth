/*
    ENDPOINT(S): POST /signin
    
    PURPOSE: This middleware function is used to check the USERS table to make sure the POSTed username
    exists, and that the password provided by the user is correct.
*/

// Dependencies
const bcrypt = require("bcryptjs");

async function checkUniqueUsername(req, res, next) {
  const db = req.app.get("db");

  const { username, password } = req.body;

                     // Returns an array
  const user = await db.query(`SELECT * FROM USERS WHERE USERS.USERNAME = '${username}'`);

  // If a user was not found, return an error.
  if (!user[0]) {
    res.boom.badRequest("That password is incorrect");
  }

  // Check the provided password against what was stored in the DB
  const isCorrectPassword = bcrypt.compareSync(password, user[0].password);

  if (!isCorrectPassword) {
    return res.boom.badRequest("That password is incorrect");
  }

  next();
}

module.exports = checkUniqueUsername;
