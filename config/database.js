/* 
  database configuration file
*/

// dependencies
const mongoose = require('mongoose');
const { MONGODB_URI, DEV_MONGODB_URI } = process.env;

// options container
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// connect to the database
mongoose.connect(
  process.env.NODE_ENV === 'production' ? MONGODB_URI : DEV_MONGODB_URI,
  options
);

// get the connection
const connection = mongoose.connection;

// error event handler
connection.on('error', console.error.bind(console, 'connection error:'));

// event handler for when the connection is open
connection.once('open', function() {
  console.log('Connected to the Mongo Database');
});
