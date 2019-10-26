'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

module.exports.http = (request, response) => {
    const database = new DatabaseService();
    const files = new FileStorageService();
    
    // Get the Request and File
    const data = database.getByRequestId(0);
    const file = files.getFile(data.fileId);

    // Return our JSON Response
    const jsonReturn = {
        request: data,
        file: file,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
};