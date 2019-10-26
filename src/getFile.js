'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

module.exports.getFile = (request, response) => {
    const database = new DatabaseService();
    const files = new FileStorageService();
    
    // Get the Parameters
    let fileId = Utils.getQueryOrBodyParam(request, "fileId");

    // Get the Request and File
    const file = files.getFile(fileId);

    // Return our JSON Response
    const jsonReturn = {
        file: file,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
};