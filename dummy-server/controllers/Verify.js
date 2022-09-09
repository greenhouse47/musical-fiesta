'use strict';

var utils = require('../utils/writer.js');
var Verify = require('../service/VerifyService');

module.exports.verifyClient = function verifyClient (req, res, next) {
  Verify.verifyClient()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
