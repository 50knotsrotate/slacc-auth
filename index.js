require("dotenv").config();

// Dependencies
var express = require("express");
var app = express();
var massive = require("massive");
const cors = require("cors");
const boom = require("express-boom");
const json = require('./package.json')

const fs = require("fs");
const path = require('path');

// Auth middleware
const authenticateUser = require("./middleware/authenticateUser");
const checkFormComplete = require("./middleware/checkFormComplete");
const checkUniqueUsername = require("./middleware/checkUniqueUsername");
const saveUser = require("./middleware/saveUser");
const issueToken = require("./middleware/issueToken");

// Utils
const asyncMiddleware = require('./utils');

// Env
const { CONNECTION_STRING } = process.env;

// For easy error handling
app.use(boom());

// For parsing body of incoming post requests
app.use(express.json());

app.use(cors("*"));


// Connection to database
massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log("db started");
  })
  .catch((err) => console.log("failed to connect to db: " + err));

// Endpoints
app.post("/auth/signup",checkFormComplete, asyncMiddleware(checkUniqueUsername), asyncMiddleware(saveUser), issueToken);
app.post("/auth/signin", asyncMiddleware(authenticateUser), asyncMiddleware(issueToken));

// Not found
app.use((req, res, next) => res.boom.notFound());


app.use((err, req, res, next) => {
  const error = {};
  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Oops! Something went wrong on our end.";

  res.send(error);
});

// Listen
app.listen(3002, () => console.log("Authentication server started on: 3002"));
