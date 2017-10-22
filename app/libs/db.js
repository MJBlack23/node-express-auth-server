// file: ./app/libs/db.js
const mongoose = require('mongoose');

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('Database Error...');
  console.log(error);
});

db.once('open', () => {
  console.log('Database Connected...');
});

db.on('disconnected', () => {
  console.log('Database Disconnected...');
});
