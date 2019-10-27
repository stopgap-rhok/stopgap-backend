'use strict';
const Utils = require("./utils/Utils");
const cors = require('cors');
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");
const FileStorageService = require("./services/FileStorageService");

const express = require("express");
const path = require('path');
const os = require('os');
const fs = require('fs');

// Node.js doesn't have a built-in multipart/form-data parsing library.
// Instead, we can use the 'busboy' library from NPM to parse these requests.
const Busboy = require('busboy');
const app = express();

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const uuid = require("uuid");

app.use(cors());

const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

app.use(async function (req, res) {
  if (req.method !== 'POST') {
    // Return a "method not allowed" error
    return res.status(405).end();
  }
  const busboy = new Busboy({headers: req.headers});

  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    // TODO(developer): Process submitted field values here
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];
  const attachments = [];

  // This code will process each file uploaded.
  busboy.on('file', (fieldname, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`Processed file ${filename}`);

    const extension = filename.match(/\.(.+)$/)[1];

    const fileName = `image-${uuid()}.${extension}`;

    const uploadTarget = storage
      .bucket(process.env.GCS_BUCKET).file(fileName).createWriteStream();

    file.pipe(uploadTarget);

    // File was processed by Busboy; wait for it to be written to disk.
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        uploadTarget.end();
      });
      uploadTarget.on('finish', resolve);
      uploadTarget.on('error', reject);
    });
    fileWrites.push(promise);
    attachments.push(fileName)
  });

  await new Promise((resolve) => {
    // Triggered once all uploaded files are processed by Busboy.
    // We still need to wait for the disk writes (saves) to complete.
    busboy.on('finish', () => {resolve(Promise.all(fileWrites))});
  });

  busboy.end(req.rawBody);

  // Convert Fields to Model
  const rampRequest = new RampRequest({
    businessName: fields.businessName,
    businessAddress: fields.businessAddress,
    businessDetails: fields.businessDetails,
    metRequirements: fields.metRequirements,
    userEmail: fields.userEmail,
    userIsOwner: fields.userIsOwner,
    attachments: attachments,
  });

  // Upload the File and retrieve its ID. Assigning it to the field on our Request Data
  // requestData.attachments.forEach(fileData => {
  //   let fileUrl = files.uploadFile(fileData);
  //   rampRequest.attachments.push(fileUrl);
  // });

  // Upload the Request Data
  const rampRequestId = await database.create(rampRequest);

  // Return our Response
  const jsonReturn = {
    requestId: rampRequestId,
  };

  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(jsonReturn));
});

exports.uploadRampRequest = app;
