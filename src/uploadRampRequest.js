'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

exports.http = (request, response) => {
  const database = new DatabaseService();
  const files = new FileStorageService();
  let data = Utils.getBodyParam(request, "data");
  database.upload(data);
  response.status(200).send('Uploaded Successfully');
};