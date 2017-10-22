// file: ./router/index.js
'use strict';

const passport = require('passport');
const auth = require('../controllers/authentication');
const passportService = require('../libs/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  // Auth routes
  app.post('/api/v1/auth/signup', auth.signUp);
  app.post('/api/v1/auth/signin', requireSignin, auth.signIn);

  // Protected Test Route
  app.get('/api/v1/test', requireAuth, (req, res) => {
    res.send({ message: 'You are authorized' });
  });
};
