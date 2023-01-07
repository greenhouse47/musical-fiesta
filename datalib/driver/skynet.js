const { SkynetClient, genKeyPairFromSeed } = require("@skynetlabs/skynet-nodejs");

class Skynet {
  #url;
  #apikey;
  #privateKey;
  publicKey;
  #seed;

  constructor(url, apikey, privateKey, publicKey, seed) {
    this.#url = url;
    this.#apikey = apikey;
    // this.#privateKey = privateKey;
    // this.#publicKey = publicKey;
    this.#seed = seed;

    this.#client = new SkynetClient(this.#url, { skynetApiKey: this.#apikey });
    const { publicKey, privateKey } = genKeyPairFromSeed(this.#seed);
    this.publicKey = publicKey;
    this.#privateKey = privateKey;
  }

  async #uploadJson(dataIn) {
    // use adapter to upload file here.
    try {
      const { data, dataLink } = await this.#client.dbV2.setJSON(this.#privateKey, key, datain);
      return { err: null, data: data, link: dataLink };
    } catch (error) {
      throw { err: error };
    }
  }

  async createTable(tableName, schema) {
    // use adapter to create table structure here.
    return this.#uploadJson(tableName, schema);
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