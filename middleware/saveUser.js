/* 
    ROUTE(S): POST /signup
    PURPOSE: This middleware function takes a users password, hashes it, and then inserts it into the DB.

*/

// Dependencies
const bcrypt = require("bcryptjs");

async function saveUser(req, res, next) {
    try {
        const db = req.app.get("db");

        const { username, password } = req.body;

        const salt = 10;

        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `INSERT INTO USERS(username,password) VALUES('${username}', '${hashedPassword}') RETURNING *;`
        
        const user = await db.query(query);

        if (!user[0]) { 
            const err = new Error();
            err.statusCode = 400;
            err.message = 'There was a problem and your account was not created. Please try again.';
        }
        next()

    } catch (_err) { 
        const err = new Error();
        err.statusCode = 'There was a problem and your account was not created. Please try again.'
        err.statusCode = 400;
        next(err)
    }

}

module.exports = saveUser;
