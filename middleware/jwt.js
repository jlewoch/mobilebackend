/* 
  JSON web token authentication middleware
*/
// dependencies
const { verify } = require('jsonwebtoken');
const User = require('../models/user.model');

// token check function
async function checkToken(req, res, next) {
  try {
    // get token from request
    const { authorization } = req.headers;
    // check if the token exists in request
    if (!authorization) throw Error('Unauthorized');
    // verify the token will throw an error if it does not verify
    const verified = verify(authorization, process.env.JWT);
    // check if the user does exist in the database
    await userExists(verified.uid);
    // continue
    next();
  } catch (error) {
    // send unauthorized response if any checks fail
    res.sendStatus(401);
  }
}

// function to check if user exists
async function userExists(id) {
  // look for user inm DB
  const user = await User.findById(id);
  // check if user was found
  if (!user) throw Error('Unauthorized');
  // set instance of user if they exist
  this.user = user;
}
// export module
module.exports = checkToken;
