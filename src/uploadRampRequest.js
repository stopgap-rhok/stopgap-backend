'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

exports.http = (request, response) => {
  const database = new DatabaseService();
  const files = new FileStorageService();
  
  let data = Utils.getBodyParam(request, "data");
  let requestData = data.requestData;
  let fileData = data.fileData;

  database.upload(requestData);
  files.uploadFile(fileData);
  response.status(200).send('Uploaded Successfully');
};