'use strict';
const DatabaseUtil = require("./utils/DatabaseUtil");

exports.http = (request, response) => {
    let database = new DatabaseUtil();

    response.status(200).send('Get All Requests - Hello World!');
};