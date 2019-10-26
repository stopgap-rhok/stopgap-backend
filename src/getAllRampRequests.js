'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

module.exports.http = (request, response) => {
    const database = new DatabaseService();
    const files = new FileStorageService();

    // Get the Parameters and Retrieve the Requests
    let dbData = [];
    if (Utils.hasQueryOrBodyParam(request, "pagination")) {
        const pagination = Utils.getQueryOrBodyParam(request, "pagination");
        let skip = pagination.skip;
        let take = pagination.take;
        dbData = database.getAllPaginated(skip, take);
    } else {
        dbData = database.GetAll();
    }

    // Return our JSON Response
    const jsonReturn = [];
    dbData.forEach(data => {
        jsonReturn.push({
            request: data,
            file: files.getFile(data.fileId),
        });
    });

    response.status(200).send(JSON.stringify(jsonReturn));
};