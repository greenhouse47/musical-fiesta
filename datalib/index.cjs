const adapter = require('./adapter');
// import { query } from "express";



// create read update delete with tables
// create read update delete with records

// setiap record adalah file
// tabel berisi daftar id dari file dan field dan value yang menjadi index.
//        primary key dan foreign key menjadi bagian dari index.
//        perlu scheme atau tidak? kayaknya tidak perlu scheme.
//        tanpa type juga.

class DataLib {
  #url;
  #apikey;
  #seed;
  #privateKey;
  #client;
  publicKey;

  constructor (driver, url, apikey, seed, publicKey, privateKey, ) {
  // load adapter and driver here.
  }

  /**
   * Create table with structure in it. 
   * @param {string} tableName Name of table to be create
   * @param {object} schema Object of table structure
   */
  createTable(tableName, schema) {
    
  }

  async listTable() {
    // use adapter to list table here.
  }

  async readTable(tableName) {
    // use adapter to read table here.
  }

  async updateTable(tableName, schema) {
    // use adapter to update table here.
  }

  async deleteTable(tableName) {
    // use adapter to delete table here.
  }

  async insertRecord(tableName, record) {
    // use adapter to insert record here.
  }

  async selectRecord(tableName, query) {
    // use adapter to select record with query, that only contain index.
  }

  async updateRecord(tableName, query) {
    // use adapter to update record with query, that only contain index.
  }

  async deleteRecord(tableName, query) {
    // use adapter to delete record with query, that only contain index.
  }

  async queryRecord(tableName, query) {
    // use adapter to select record with query, can contain another field outside index.
  }
}

module.exports = Skydb;

// function DataLib( skynet, skynetApiKey, seed ) {
//   let reval = false;
//   const self = this;

//   self.client = new SkynetClient(skynet, { skynetApiKey: skynetApiKey });
//   const { publicKey, privateKey } = genKeyPairFromSeed(seed);
//   self.keypair = {
//     publicKey: publicKey,
//     privateKey: privateKey
//   };

//   return reval;
// }

// module.exports = {
//   init: function () {}, // init the rest of the query. it's a promise.
//   table: {
//     create: function () {}, // create a table.
//     list: function () {}, // list table
//     read: function () {}, // show table scheme.
//     update: function () {}, // update table scheme.
//     delete: function () {} // delete table.
//   },
//   record: {
//     insert: function () {}, // insert a record to table.
//     select: function () {}, // select a record from a table.
//     update: function () {}, // updaate a record from a table.
//     delete: function () {},  // delete a record from a table.
//     query: function () {} // one size fit all wannabe.
//   }
// }