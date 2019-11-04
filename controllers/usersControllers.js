/* 

*/
// dependencies
const { updateSubmitValidationHandler } = require('../helpers/validation');
// user container
const user = {};

user.getProfile = function(req, res) {
  // return the user instance populated by middleware
  return res.status(200).json({ data: this.user });
};
user.updateProfile = async function(req, res) {
  try {
    // apply new values sent in request
    this.user.updateOne(req.fields);
    // validate all new fields based on model requirement and throws a general error message if there is an error
    updateSubmitValidationHandler(this.user);
    // save changes if there is no errors
    await this.user.save();
    // return new values
    res.status(200).json({ data: this.user });
  } catch (error) {
    // return error if anything fails
    res.status(400).json({ message: error.message });
  }
};
// export module
module.exports = user;
