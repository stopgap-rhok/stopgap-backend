'use strict';

const getAllRampRequests = require("./src/getAllRampRequests");
const getRampRequest = require("./src/getRampRequest");
const uploadRampRequest = require("./src/uploadRampRequest");
const updateRampRequest = require("./src/updateRampRequest");
const deleteRampRequest = require("./src/deleteRampRequest");
const dumpRequest = require("./src/dumpRequest");

exports.getAllRampRequests = getAllRampRequests.getAllRampRequests;
exports.getRampRequest = getRampRequest.getRampRequest;
exports.uploadRampRequest = uploadRampRequest.uploadRampRequest;
exports.updateRampRequest = updateRampRequest.updateRampRequest;
exports.deleteRampRequest = deleteRampRequest.deleteRampRequest;
exports.dumpRequest = dumpRequest.dumpRequest;