
class DbAdapter {
  #url;
  #apikey;
  #privateKey;
  publicKey;
  #seed;
  #driver;

  constructor (driver, url, apikey, privateKey, publicKey, seed) {
    this.#driver = driver;
    this.#url = url;
    this.#apikey = apikey;
    this.#privateKey = privateKey;
    this.publicKey = publicKey;
    this.#seed = seed;
  }

  async #uploadJson(dataIn) {
    // use adapter to upload file here.
  }

  async createTable(tableName, schema) {
    // use adapter to create table structure here.
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

module.exports = DbAdapter;

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