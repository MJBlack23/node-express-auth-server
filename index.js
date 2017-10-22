// file: ./index.js
'use strict';

// Set up environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const appName = process.env.APP_NAME;
const port = process.env.PORT || 8080;

const app = express();
const router = require('./app/router/');

// connect mongoDB
require('./app/libs/db');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
