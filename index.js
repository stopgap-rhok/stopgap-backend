'use strict';

const getAllRampRequests = require("./src/getAllRampRequests");
const getRampRequest = require("./src/getRampRequest");
const uploadRampRequest = require("./src/uploadRampRequest");
const dumpRequest = require("./src/dumpRequest");

exports.getAllRampRequests = getAllRampRequests.getAllRampRequests;
exports.getRampRequest = getRampRequest.getRampRequest;
exports.uploadRampRequest = uploadRampRequest.uploadRampRequest;
exports.dumpRequest = dumpRequest.dumpRequest;
