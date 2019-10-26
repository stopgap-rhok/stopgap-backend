'use strict';

require("./src/getAllRampRequests.js");
require("./src/getFile.js");
require("./src/getRampRequest.js");
require("./src/uploadRampRequest.js");

exports.getAllRampRequests = (request, response) => {
  getAllRampRequests.getAllRampRequests(request, response);
};

exports.getFile = (request, response) => {
  getFile.getFile(request, response);
};

exports.getRampRequest = (request, response) => {
  getRampRequest.getRampRequest(request, response);
};

exports.uploadRampRequest = (request, response) => {
  uploadRampRequest.uploadRampRequest(request, response);
};
