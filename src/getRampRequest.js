'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

module.exports.getRampRequest = (request, response) => {
    const database = new DatabaseService();
    const files = new FileStorageService();
    
    // Get the Parameters
    let rampRequestId = Utils.getQueryOrBodyParam(request, "rampRequestId");

    // Get the Request and File
    const rampRequest = database.getByRequestId(rampRequestId);

    // Return our JSON Response
    const jsonReturn = {
        request: rampRequest,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
};