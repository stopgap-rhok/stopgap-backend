'use strict';

const getAllRampRequests = require("./src/getAllRampRequests");
const getRampRequest = require("./src/getRampRequest");
const uploadRampRequest = require("./src/uploadRampRequest");
const dumpRequest = require("./src/dumpRequest");

exports.getAllRampRequests = (request, response) => {
  getAllRampRequests.getAllRampRequests(request, response);
};

exports.getRampRequest = (request, response) => {
  getRampRequest.getRampRequest(request, response);
};

exports.uploadRampRequest = (request, response) => {
  uploadRampRequest.uploadRampRequest(request, response);
};

exports.dumpRequest = (request, response) => {
  dumpRequest.dumpRequest(request, response);
};
