'use strict';
const Utils = require("./utils/Utils");
const DatabaseService = require("./services/DatabaseService");
const cors = require('cors');

const express = require("express");
const app = express();

app.use(cors());

app.use(async (request, response) => {
    const database = new DatabaseService();

    // Get the Parameters
    /* { "rampRequestId": "" } */
    let rampRequestId = Utils.getQueryOrBodyParam(request, "rampRequestId");

    // Get the Request and File
    const rampRequest = await database.deleteByRequestId(rampRequestId);

    // Return our JSON Response
    const jsonReturn = {
        request: rampRequest,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
});

module.exports.deleteRampRequest = app;
