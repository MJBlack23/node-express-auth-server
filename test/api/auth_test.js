'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const { expect, should } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const axios = require('axios');
const mongoose = require('mongoose');
const user = require(path.resolve('app', 'models', 'user.js'));

chai.use(chaiAsPromised);
mongoose.Promise = global.Promise;

const BASE_URL = 'http://localhost:8080/api/v1/auth';

describe('testing the auth endpoints', () => {
  before(done => {
    mongoose.connect(process.env.MONGODB_URI, error => {
      user.remove({ email: 'test@test.com' }, error => {
        if (error) throw error;

        mongoose.disconnect();
        done();
      });
    });
  });

  it('should be able to sign up for a new account', done => {
    axios
      .post(`${BASE_URL}/signup`, {
        email: 'test@test.com',
        password: 'password'
      })
      .then(response => {
        expect(response.data.token).to.exist;
        expect(response.data.token).to.be.a.string;
        expect(response.data.token.length).to.be.above(15);
      })
      .then(done)
      .catch(done);
  });

  it('should be able to log in after user has been created', done => {
    axios
      .post(`${BASE_URL}/signin`, {
        email: 'test@test.com',
        password: 'password'
      })
      .then(response => {
        fs.writeFile('./test/token.json', JSON.stringify(response.data, null, 1), 'utf8', err => {
          expect(response.data.token).to.exist;
          expect(response.data.token).to.be.a.string;
          expect(response.data.token.length).to.be.above(15);
        });
      })
      .then(done)
      .catch(done);
  });
});
