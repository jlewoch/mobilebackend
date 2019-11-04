// set env variables
require('dotenv').config();
// setup database from config
require('./config/database');
// setup sockets from config
require('./config/sockets');

// set port
const { PORT, DEV_PORT, NODE_ENV } = process.env;
const port = NODE_ENV === 'production' ? PORT : DEV_PORT;

// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const formidableMiddleware = require('express-formidable');
const checkToken = require('./middleware/jwt');

// apply middleware
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  formidableMiddleware({
    encoding: 'utf-8',
    multiples: true
  })
);

// set routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', checkToken, require('./routes'));

// start server
app.listen(port, () => console.log(port));
