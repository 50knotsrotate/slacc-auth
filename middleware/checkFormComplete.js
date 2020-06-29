/* 
    ENDPOINT(S): POST /signup

    PURPOSE: This middleware function checks to make sure the user completely filled out
             the signup form and that it passes a basic REGEX test.
             For now, the requirements for a username and password are simple: A username cant be empty
             and a password must be at least 8 characters. The REGEX for these are provided in this file.
*/

function checkFormComplete(req, res, next) {
  const { username, password } = req.body;

  const usernameRegex = /^[A-Za-z0-9 ]{5,31}$/;

  /*
    Got this password regex from stackoverflow. I gotta give credit where its due.

    https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
*/

  // Minimum eight characters, at least one letter and one number:
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const isValidUsername = usernameRegex.test(username);
  
  const isValidPassword = passwordRegex.test(password);

  if (!isValidUsername) { 
    const err = new Error();
    err.message = 'Username must be 5-31 characters long and contain no special characters'
    err.statusCode = 400;
    next(err)
  }

  if (!isValidPassword) { 
    const err = new Error();
    err.message = "Password must be at least 8 characters with at least one letter and one number";
    err.statusCode = 400;
    next(err);
  }

  return next();
}

module.exports = checkFormComplete;
