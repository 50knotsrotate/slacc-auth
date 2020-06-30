/* 
    ROUTE(S): POST /signup /signin
    PURPOSE: This function hashes a username and issues a JWT. This should always be the last middleware for these routes.
    for POST /signup and POST /signin

*/
const jwt = require("jsonwebtoken");

function issueToken(req, res, next) {
  const { username } = req.body;

  /*  JWT config.  */

  // You should use a cache here. 
  const data = {
    identifier: username
  };
  const secret =
    "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3"; //Change this and put in .env

  const iat = Date.now() / 1000;

  const jwtid = Math.random()
    .toString(36)
    .substring(7); // Copied from https://www.js-tutorials.com/nodejs-tutorial/user-authentication-using-jwt-json-web-token-node-js/

  const audience = "test"; // I think I have to make this the domain of the app, but this will be fine for now.

  const payload = {
    iat,
    jwtid,
    audience,
    data
  };

  const options = {
    algorithm: "HS256",
    expiresIn: "1h"
  };
  // End JWT config

  const token = jwt.sign(payload, secret, options);

  if (!token) { 
    return res.boom.badRequest("There was a problem on our end. Please try again.");
  }

  res.cookie('identifier', token);

  res.status(200).send();

}

module.exports = issueToken;
