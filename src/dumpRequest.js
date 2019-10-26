'use strict';

const util = require('util');


module.exports.dumpRequest = (request, response) => {
    console.log(request);
    console.log(response);

    const jsonReturn = {
        requestJson: util.inspect(request, {showHidden: false, depth: 1}),
        responseJson: util.inspect(response, {showHidden: false, depth: 1})
    };

    console.log(jsonReturn);
    response.status(200).send(JSON.stringify(jsonReturn));
};
