'use strict';


/**
 * Create new table
 * Create new table with or without first data or table schema. If first data present, the object structure of the first data will be used as a schema base, but the accuracy of data type is not guaranteed.
 *
 * body TableSubmit  (optional)
 * no response value expected for this operation
 **/
exports.createTable = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete table schema by table name.
 * Delete table schema by table name. 
 *
 * tableName String name of table to delete the schema.
 * returns TableSchemaExample
 **/
exports.deleteTable = function(tableName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : {
    "type" : "string",
    "example" : "South street 14th"
  },
  "name" : {
    "type" : "string",
    "example" : "John Doe"
  },
  "bloodType" : {
    "type" : "string",
    "example" : "A-"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get table schema by table name.
 * return table schema of table name.
 *
 * tableName String name of table to fetch the schema.
 * returns TableSchemaExample
 **/
exports.readTable = function(tableName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : {
    "type" : "string",
    "example" : "South street 14th"
  },
  "name" : {
    "type" : "string",
    "example" : "John Doe"
  },
  "bloodType" : {
    "type" : "string",
    "example" : "A-"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get list of tables.
 * return tables name.
 *
 * returns Tables
 **/
exports.readTables = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "_data" : "data_myTable",
  "_schema" : "schema_myTable",
  "name" : "myTable"
}, {
  "_data" : "data_myTable",
  "_schema" : "schema_myTable",
  "name" : "myTable"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update table schema by table name.
 * Update table schema by table name. Everything in the schema can be updated, exept the indexed id. 
 *
 * tableName String name of table to update the schema.
 * returns TableSchemaExample
 **/
exports.updateTable = function(tableName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : {
    "type" : "string",
    "example" : "South street 14th"
  },
  "name" : {
    "type" : "string",
    "example" : "John Doe"
  },
  "bloodType" : {
    "type" : "string",
    "example" : "A-"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

