'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

exports.http = (request, response) => {
  const database = new DatabaseService();
  const files = new FileStorageService();

  // Get the Parameters
  let data = Utils.getBodyParam(request, "data");
  let requestData = data.requestData;
  let fileData = data.fileData;

  // Upload the File and retrieve its ID. Assigning it to the field on our Request Data
  let fileId = files.uploadFile(fileData);
  requestData.fileId = fileId;

  // Upload the Request Data
  database.upload(requestData);

  // Return our Response
  response.status(200).send('Uploaded Successfully');
};