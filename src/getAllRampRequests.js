'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

module.exports.http = (request, response) => {
    const database = new DatabaseService();
    const files = new FileStorageService();

    // Get the Request and File
    const data = database.GetAll();

    // Return our JSON Response
    const jsonReturn = [];
    data.forEach(element => {
        jsonReturn.push({
            request: element,
            file: files.getFile(element.fileId),
        });
    });

    response.status(200).send(JSON.stringify(jsonReturn));
};