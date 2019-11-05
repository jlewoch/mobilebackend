/* 
   controls what happens to all requests to authentication routes
*/
// dependencies
const { sign } = require('jsonwebtoken');
const User = require('../models/user.model');
const {
  updateSubmitValidationHandler,
  isEmail,
  isLength
} = require('../helpers/validation');

// controller container
const auth = {};
// signup
auth.signup = async (req, res) => {
  try {
    //  create new instance of user
    this.user = new User(req.fields);
    // validate fields provided and throw generic error messege if there is an error
    updateSubmitValidationHandler(this.user);
    // save if there is no error
    await this.user.save();
    // return response
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};
// login
auth.login = async (req, res) => {
  try {
    // get email and password fields from request
    const { email, password } = req.fields;
    /* 
    check if email was provided and is in the correct format
    check if password was provided and is atleast 8 characters long
    */
    if (!email || !isEmail(email) || !password || isLength(password, 8))
      throw Error('Invalid username and password provided');
    /*  
      get users hashed password 
      make sure it is not case sensitive when looking by email
    */
    let current = await User.findOne({
      email: new RegExp(email, 'i')
    }).select('password');
    // check if the user exists and if password provided is valid
    if (!current || !current.checkPass(password))
      throw Error('Invalid username and password provided');
    // get a new instance of the user without the password to return
    current = await User.findById(current._id);
    // generate a signed access token for user
    const token = await sign({ uid: current._id }, process.env.JWT);
    // return token and user
    res.status(200).json({ data: { user: current, token } });
  } catch (error) {
    // return error if any checks failed
    res.status(400).json({ error: true, message: error.message });
  }
};

// export controller
module.exports = auth;
