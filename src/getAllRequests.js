'use strict';

exports.http = (request, response) => {
  response.status(200).send('Get All Requests - Hello World!');
};