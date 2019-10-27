'use strict';
const Utils = require("./utils/Utils");
const DatabaseService = require("./services/DatabaseService");
const cors = require('cors');

const express = require("express");
const app = express();

app.use(cors());

app.use(async (request, response) => {
    const database = new DatabaseService();

    // Get the Parameters and Retrieve the Requests
    let dbData = [];
    if (Utils.hasQueryOrBodyParam(request, "pagination")) {
        /*
        {
            "pagination": {
                "skip": 1,
                "take": 10,
            }
        }   */
        const pagination = Utils.getQueryOrBodyParam(request, "pagination");
        let skip = pagination.skip;
        let take = pagination.take;
        dbData = await database.getAllPaginated(skip, take);
    } else {
        dbData = await database.getAll();
    }

    // Return our JSON Response
    const jsonReturn = [];
    dbData.forEach(data => {
        jsonReturn.push({
            request: data,
        });
    });

    response.status(200).send(JSON.stringify(jsonReturn));
});

module.exports.getAllRampRequests = app;
