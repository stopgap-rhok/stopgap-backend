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
  let data = Utils.getBodyParam(req, "data");
  let requestData = data.requestData;
  let fileData = data.fileData;

  // Upload the File and retrieve its ID. Assigning it to the field on our Request Data
  let fileUrl = files.uploadFile(fileData);
  requestData.attachmentUrls.push(fileUrl);

  // Upload the Request Data
  database.upload(requestData);

  // Return our Response
  res.status(200).send('Uploaded Successfully');
});

exports.uploadRampRequest = app;
