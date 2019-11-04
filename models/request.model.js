/* 
  Request model
*/
// dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const RequestSchema = new Schema({
  requestor: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    required: true,
    default: 'pending'
  },
  date: { type: String, required: true },
  start_time: { type: String, required: true },
  type: { type: String, enum: ['1 Hour Walk', 'House Sit', 'Boarding'] }
});

// export model
module.exports = mongoose.model('Request', RequestSchema);
