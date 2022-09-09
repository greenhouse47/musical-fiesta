'use strict';


/**
 * Verify client app authentication.
 * This endpoint will verify client app for it's authenticity. If authentication valid, server will send that key for transaction. 
 *
 * returns inline_response_200
 **/
exports.verifyClient = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "payload" : "payload",
  "session" : "session"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

