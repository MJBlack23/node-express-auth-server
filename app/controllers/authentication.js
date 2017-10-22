// file: ./controllers/authentication.js
'use strict';

const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.PASSPORT_SECRET);
}

exports.signUp = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'You must provide email and password.' });
  }

  // see if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // if a user with an email does exist return an error
    if (existingUser) {
      return res.status(422).send({ message: 'Email address already in use.' });
    }

    // If a user with email doesn't exist create and save record
    const user = new User({ email, password });

    user.save(err => {
      if (err) {
        return next(err);
      }
    });

    // respond to request indicating the user was created
    res.send({ token: tokenForUser(user) });
  }); // end user.findOne
}; // end export signup

exports.signIn = (req, res, next) => {
  // user has already had email/password auth'd
  // need to give them a jwt
  res.send({ token: tokenForUser(req.user) });
}; // end export signin
