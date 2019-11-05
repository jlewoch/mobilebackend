/*  
  controller for all request to the pet routes 
*/

// dependencies
const Pet = require('../models/pet.model');
const { updateSubmitValidationHandler } = require('../helpers/validation');
const imageUpload = require('../handlers/imageUpload');

// pets container
const pets = {};
// update pet
pets.updatePet = async function(req, res) {
  try {
    // get the instance of the pet based on the id in the request
    const instance = await Pet.findById(req.params.id);
    // handle the image in the request
    const img = await imageUpload(req);
    // update instance fields with the ones sent in the request
    instance.set({ ...req.fields, img: img ? img : instance.img });
    // run a validation check this will throw a general error message if a field is incorrect
    updateSubmitValidationHandler(instance);
    // save the updated instance
    await instance.save();
    // return the updated instance
    res.status(200).json({ data: instance });
  } catch (error) {
    // return an error if any errors occured during update
    res.status(400).json({ message: error.message });
  }
};
// add pet
pets.addNewPet = async function(req, res) {
  try {
    // handle the image in the request if there is one
    const img = await imageUpload(req);
    // create an instance of the new pet
    const instance = new Pet({
      ...req.fields,
      owner: this.user._id,
      img
    });
    // run a validation check this will throw a general error message if a field is incorrect
    updateSubmitValidationHandler(instance);
    // add pet to current user
    this.user.pets.push(instance);
    // save pet and user
    await Promise.all([instance.save(), this.user.save()]);
    // return the new pet
    res.status(201).json({ data: instance });
  } catch (error) {
    // return any errors
    res.status(400).json({ message: error.message });
  }
};

// remove pet
pets.removePet = async function(req, res) {
  try {
    // create instance of the pet specified
    const instance = await Pet.findById(req.params.id);
    if (!instance) throw Error('Pet has already been deleted');
    // delete the pet it will also remove from the user that is the owner before it is deleted
    await instance.deleteOne();
    // return success
    res.sendStatus(200);
  } catch (error) {
    // return any errors
    res.status(400).json({ message: error.message });
  }
};
// export module
module.exports = pets;
