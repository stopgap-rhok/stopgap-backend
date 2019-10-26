'use strict';

module.exports.dumpRequest = (request, response) => {
    console.table(request);
    console.table(response);

    const jsonReturn = {
        requestJson = JSON.stringify(request),
        responseJson = JSON.stringify(response)
    };
    response.status(200).send(JSON.stringify(jsonReturn));
};