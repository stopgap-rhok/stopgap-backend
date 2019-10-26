'use strict';
const Utils = require("./utils/Utils");
const DatabaseUtil = require("./utils/DatabaseUtil");
const RampRequest = require("./models/RampRequest");

exports.http = (request, response) => {
  const database = new DatabaseUtil();
  let data = Utils.getBodyParam(request, "data");
  database.upload(data);
  response.status(200).send('Uploaded Successfully');
};