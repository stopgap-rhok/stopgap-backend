'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

module.exports.http = (request, response) => {
    const database = new DatabaseService();
    const files = new FileStorageService();
    const data = database.GetAll();
    response.status(200).send(JSON.stringify(data));
};