/* 
  Pet model
*/
// dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
// model creation
const PetSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  img: String,
  breed: { type: String, default: '' },
  age: { type: Number, required: true },
  play_child: { type: Boolean, required: true },
  play_dog: { type: Boolean, required: true },
  play_cat: { type: Boolean, required: true },
  around_child: { type: Boolean, required: true },
  around_dog: { type: Boolean, required: true },
  around_cat: { type: Boolean, required: true },
  microchip: { type: Boolean, required: true },
  house_trained: { type: Boolean, required: true },
  nutered_spayed: { type: Boolean, required: true },
  name: { type: String, required: true },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  },
  notes: { type: String, default: '' }
});
// post\pre model event handlers
PetSchema.pre('deleteOne', { document: true }, async function() {
  // remove specified pet from owners list of pets before it is deleted from the database
  await User.updateOne(
    { _id: this.owner },
    {
      $pull: {
        pets: this._id
      }
    }
  ).save();
});
// export model
module.exports = mongoose.model('Pet', PetSchema);
