require("dotenv").config();

// Dependencies
var express = require("express");
var app = express();
var massive = require("massive");
const cors = require('cors');

// Auth middleware
const authenticateUser = require('./middleware/authenticateUser');
const checkFormComplete = require('./middleware/checkFormComplete');
const checkUniqueUsername = require('./middleware/checkUniqueUsername');
const saveUser = require('./middleware/saveUser');
const issueToken = require('./middleware/issueToken');

// Env
const { CONNECTION_STRING } = process.env;

// For parsing body of incoming post requests
app.use(express.json());

app.use(cors('*'));

// Connection to database
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log('db started');
  })
  .catch(err => console.log('failed to connect to db: ' + err));

// Endpoints
app.post('/auth/signup', checkFormComplete, checkUniqueUsername, saveUser, issueToken);
app.post('/auth/signin', authenticateUser, issueToken);


// Not found
app.use(function (req, res, next) {
  const err = new Error("Page not found");
  err.statusCode = 404;
  return next(err);
});

//Error handler
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.statusCode || 400).send(err.message || 'Something went wrong and your account was not created')
});

// Listen
app.listen(3002, () => console.log("Authentication server started on: 3002"));