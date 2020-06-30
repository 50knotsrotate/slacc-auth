/* 
    ENDPOINT(S): POST /signup

    PURPOSE: This middleware function checks to make sure the user completely 
    filled out the signup form and that it passes a REGEX test.
    
*/

function checkFormComplete(req, res, next) {
  const { username, password } = req.body;

  const usernameRegex = /^[a-z0-9]{5,31}$/i;

  // Minimum eight characters, at least one letter and one number:
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const isValidUsername = usernameRegex.test(username);
  
  const isValidPassword = passwordRegex.test(password);

  if (!isValidUsername) { 
    return res.boom.badRequest("Username must be 5-31 characters long and contain no special characters");
  }

  if (!isValidPassword) { 
   return res.boom.badRequest("Password must be 5-31 characters long and contain no special characters");
  }

  next();
}

module.exports = checkFormComplete;
