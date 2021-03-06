'use strict';
const cors = require('cors');

const DatabaseService = require("./services/DatabaseService");

const express = require("express");

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
const getPublicUrlFromFilename = getPublicUrl.bind(null, process.env.GCS_BUCKET);

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
    busboy.end(req.rawBody);
  });

  // Ensure that the fields are uniform
  if (fields.businessDetails == undefined) { fields.businessDetails = ""; }
  if (fields.userEmail == undefined) { fields.userEmail = ""; }
  if (fields.canContact == undefined) {
    fields.canContact = !!fields.userIsOwner;
  }

  // Convert Fields to Model
  const rampRequest = {
    businessName: fields.businessName,
    businessAddress: fields.businessAddress,
    singleStep: fields.singleStep,
    nonResidential: fields.nonResidential,
    canContact: fields.canContact,
    stepIsWide: fields.stepIsWide,
    userIsOwner: fields.userIsOwner,
    attachments: attachments.map(getPublicUrlFromFilename),
  };

  if (fields.hasOwnProperty("sidewalkFlat")) {
    rampRequest.sidewalkFlat = fields.sidewalkFlat;
  }
  if (fields.hasOwnProperty("correctHeight")) {
    rampRequest.correctHeight = fields.correctHeight;
  }
  if (fields.hasOwnProperty("userEmail")) {
    rampRequest.userEmail = fields.userEmail;
  }

  // Upload the Request Data
  const database = new DatabaseService();
  const rampRequestId = await database.create(rampRequest);

  // Return our Response
  const jsonReturn = {
    requestId: rampRequestId,
  };

  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(jsonReturn));
});

exports.uploadRampRequest = app;
