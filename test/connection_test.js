'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const chai = require('chai');
const { expect, should } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const mongoose = require('mongoose');

chai.use(chaiAsPromised);

describe('connecting to the database', () => {
  this.timeout = 5000;
  it('should be able to connect to the database', done => {
    mongoose.connect(process.env.MONGODB_URI, error => {
      expect(error).to.be.undefined;
      mongoose.disconnect();
      done();
    });
  });
});
