'use strict';
const Utils = require("./utils/Utils");
const cors = require('cors');
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

const multer = require('multer');
const multerGoogleStorage = require("multer-google-storage");

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine()
});

const express = require("express");
const app = express();

app.use(cors());

const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

app.use(uploadHandler.single('image'), function (req, res, next) {
  const body = req.body;
  res.set('Access-Control-Allow-Origin', '*');
  res.json({fileName: req.file.filename});
  res.end();
  return;

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
  let data = Utils.getBodyParam(req, "data");
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
    rampRequest.attachments.push(fileUrl);
  });

  // Upload the Request Data
  database.create(rampRequest);

  // Return our Response
  res.status(200).send('Uploaded Successfully');
});

exports.uploadRampRequest = app;
