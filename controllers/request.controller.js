/*  
  request path controllers 
*/

// dependencies
const Request = require('../models/request.model');
const { updateSubmitValidationHandler } = require('../helpers/validation');

// request container
const requests = {};
// update request
requests.updateRequest = async function(req, res) {
  try {
    // find the request
    const instance = await Request.findById(req.params.id);
    // set fields to updated values
    instance.set(req.fields);
    // validate all of the fiedls if there is any errors a general error will be thrown
    await updateSubmitValidationHandler(instance);

    // save the new instance
    await instance.save();
    // return updated instance
    res.status(200).json({ data: instance });
  } catch (error) {
    // return an error if any errors occured during update
    res.status(400).json({ message: error.message });
  }
};
// submit reques
requests.submitRequest = async function(req, res) {
  try {
    // create new instance of the request
    const instance = new Request({ ...req.fields, requestor: this.user });
    // validate all of the fiedls if there is any errors a general error will be thrown
    await updateSubmitValidationHandler(instance);
    // save the new instance
    await instance.save();
    // add the request to the user instanace
    this.user.requests.push(instance);
    // save the user instance with the new request
    await this.user.save();
    // return the newly created request instance
    res.status(201).json({ data: instance });
  } catch (error) {
    // return any errors
    res.status(400).json({ message: error.message });
  }
};
requests.removeRequest = async function(req, res) {
  try {
  } catch (error) {
    // return any errors
    res.status(400).json({ message: error.message });
  }
};

// export module
module.exports = requests;
