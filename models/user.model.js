/* 
  User model
*/
// dependencies
const mongoose = require('mongoose');
const { hashSync, compareSync } = require('bcrypt');
const Schema = mongoose.Schema;
const { isEmail } = require('../helpers/validation');
// model definition
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: e => isEmail(e)
    }
  },
  password: {
    select: false,
    type: String,
    set: str => hashSync(str, 10),
    required: true,
    minlength: 8
  },
  img: String,
  tokens: { type: [String], select: false, unique: true },
  name: { type: String, required: true, minlength: 2 },
  street_address: String,
  city: String,
  pets: [{ type: Schema.ObjectId, ref: 'Pet', unique: true }],
  notes: { type: String, default: '', select: false },
  requests: [{ type: Schema.ObjectId, ref: 'Request' }],
  events: [{ type: Schema.ObjectId, ref: 'Events' }]
});

// methods
UserSchema.methods.checkPass = function(password) {
  return compareSync(password, this.password);
};
// export model
module.exports = mongoose.model('User', UserSchema);
