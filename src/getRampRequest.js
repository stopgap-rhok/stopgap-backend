'use strict';
const Utils = require("./utils/Utils");
const RampRequest = require("./models/RampRequest");
const DatabaseService = require("./services/DatabaseService");

module.exports.getRampRequest = async (request, response) => {
    const database = new DatabaseService();
    
    // Get the Parameters
    /* rampRequestId: "" */
    let rampRequestId = Utils.getQueryOrBodyParam(request, "rampRequestId");

    // Get the Request and File
    const rampRequest = await database.getByRequestId(rampRequestId);

    // Return our JSON Response
    const jsonReturn = {
        request: rampRequest,
    };
    response.status(200).send(JSON.stringify(jsonReturn));
};