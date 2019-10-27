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
    let data = Utils.getBodyParam(request, "data");

    // Remove the attachments from the data if it exists
    delete data.attachments;

    // Get the Request and File
    const updateRequest = await database.update(data);

    // Return our JSON Response
    const jsonReturn = {
        request: updateRequest,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
});

module.exports.updateRampRequest = app;