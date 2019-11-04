/* 
    validation functions
*/

// container for validation
const validation = {};
validation.isEmail = e => /^[\w!#$%&'*+\-\/=?^_`{|}~.;]+@\w+\.\w+/.test(e);
validation.isNotEmpty = value => value.trim().length > 0;
validation.isString = value => typeof value === 'string';
validation.isLength = (value, length) => value.trim().length === length;
validation.isBool = value => typeof value === 'boolean';
validation.updateSubmitValidationHandler = instance => {
  // checks if there is any validation errors based on model
  const error = instance.validateSync();
  // throw generic error if there is an error
  if (error) throw Error('Please fill out all required fields and try again');
};
// export the module
module.exports = validation;
