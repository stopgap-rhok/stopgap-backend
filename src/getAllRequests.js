'use strict';
const DatabaseUtil = require("./utils/DatabaseUtil");

exports.http = (request, response) => {
    const database = new DatabaseUtil();
    const data = database.GetAll();
    response.status(200).send(JSON.stringify(data));
};