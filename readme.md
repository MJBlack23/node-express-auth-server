# Express-Mongo-Auth-Server

### Purpose
This repo is intended to serve as a starting point for ExpressJS/MongoDB APIs
that require authentication via Passport and JSON web tokens.

## Dependencies
* ExpressJS
* Mongoose
  * body-parser
  * morgan
* Passport
  * Passport-jwt
  * Passport-local
  * bcrypt-nodejs
  * jwt-simple

## Dev Dependencies
* Axios
* Chai
* Chai as promised
* dotenv
* Mocha

## ENV Vars
The default boilerplate of this minimal framework expects a .env file at the base of your app (same path as index.js) with the following values.
* MONGODB_URI (compatible with heroku)
* APP_NAME
* PASSPORT_SECRET

## Tests
* Tests are written to
  * Test the connection to the database
  * Test the auth signup route
  * Test the auth signin route
