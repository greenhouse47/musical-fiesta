'use strict';

var utils = require('../utils/writer.js');
var Table = require('../service/TableService');

module.exports.createTable = function createTable (req, res, next, body) {
  Table.createTable(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTable = function deleteTable (req, res, next, tableName) {
  Table.deleteTable(tableName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readTable = function readTable (req, res, next, tableName) {
  Table.readTable(tableName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readTables = function readTables (req, res, next) {
  Table.readTables()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateTable = function updateTable (req, res, next, body, tableName) {
  Table.updateTable(body, tableName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
