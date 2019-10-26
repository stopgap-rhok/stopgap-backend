'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

exports.uploadRampRequest = (request, response) => {
  const database = new DatabaseService();
  const files = new FileStorageService();

  // Get the Parameters
  /* 
  data : {
    requestData: {
        businessName: required(string),
        businessAddress: required(string),
        businessDetails: optional(string),
        metRequirements: required([]string),
        userEmail: optional(string),
        userIsOwner: required(boolean),
        attachments: required([]file)
    }
  } */
  let data = Utils.getBodyParam(request, "data");
  let requestData = data.requestData;

  // Convert to Model
  const rampRequest = new RampRequest({
    businessName: requestData.businessName,
    businessAddress: requestData.businessAddress,
    businessDetails: requestData.businessDetails,
    metRequirements: requestData.metRequirements,
    userEmail: requestData.userEmail,
    userIsOwner: requestData.userIsOwner,
  });

  // Upload the File and retrieve its ID. Assigning it to the field on our Request Data
  requestData.attachments.forEach(fileData => {
    let fileUrl = files.uploadFile(fileData);
    rampRequest.attachmentUrls.push(fileUrl);
  });

  // Upload the Request Data
  database.upload(rampRequest);

  // Return our Response
  response.status(200).send('Uploaded Successfully');
};