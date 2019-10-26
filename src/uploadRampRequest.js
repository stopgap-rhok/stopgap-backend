'use strict';
const DatabaseUtil = require("./utils/DatabaseUtil");
const RampRequest = require("./models/RampRequest");

exports.http = (request, response) => {
  response.status(200).send('Upload Request: Hello World!');
};