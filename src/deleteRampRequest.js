'use strict';
const Utils = require("./utils/Utils");
const DatabaseService = require("./services/DatabaseService");
const cors = require('cors');

const express = require("express");
const app = express();

app.use(cors());

app.use(async (request, response) => {
    if (request.method !== 'DELETE' && request.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
    }

    const database = new DatabaseService();

    // Get the Parameters
    /* { "rampRequestId": "" } */
    let rampRequestId = Utils.getQueryOrBodyParam(request, "rampRequestId");

    // Retrieve and Delete the Files
    const rampRequest = await database.getByRequestId(rampRequestId);
    rampRequest.attachments.forEach(file => {
        // Delete the files
    });

    // Get the Request and File
    const deleteRequest = await database.deleteByRequestId(rampRequestId);

    // Return our JSON Response
    const jsonReturn = {
        request: deleteRequest,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
});

module.exports.deleteRampRequest = app;