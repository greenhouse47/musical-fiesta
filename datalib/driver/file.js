const { file } = require('chai-files');
const fs = require('fs');
const uuid = require('uuid');

class File {
  #url;
  #apikey;
  #privateKey;
  publicKey;
  #seed;

  /**
   * DbLib driver for local file storage, This make for test.
   * @param {string} url location of stored database file, url with not trailing slash.
   * @param {string} seed Seed of private and public keypair
   * @param {string} apikey An apikey of storage
   * @param {string} privateKey Private key if pregenerated before
   * @param {string} publicKey Public key if pregenerated before.
   */
  constructor(url, seed, apikey, privateKey, publicKey) {
    this.#url = url;
    this.#apikey = apikey;
    this.#privateKey = privateKey;
    this.publicKey = publicKey;
    this.#seed = seed;
    const _self = this;

    return new Promise(function(resolve, reject) {
      fs.access(url, fs.constants.F_OK, function(err) {
        if (err) {
          fs.mkdir(url, {recursive: true}, function (err) {
            if (err) reject(new Error(err));
          });
        } else resolve(_self);
      });

      fs.access(url, fs.constants.R_OK & fs.constants.W_OK, function(err) {
        if (err) reject(new Error(err));
        else resolve(_self);
      });  
    });

    // console.log(res.then(function(s) { return s; }));
  }

  /**
   * Upload json function to store everything in orderly manner.
   * @param {string} destination Destination are destination type (record or table) of dataIn.
   * @param {object} dataIn json data of table or record.
   * @returns {promise | string} Return promise or file id.
   */
  #uploadJson(destination, dataIn) {
    // use adapter to upload file here.
    // write file to url
    // const dst = url + destination;
    const dstType = destination;
    const _self = this;

    if (dstType === 'table') {
      const index = _self.#url + '/index.json'; // index are index of tables
      return new Promise(function (resolve, reject) {
        fs.access(index, fs.constants.F_OK, function (err) {
          if (err) {// file index not exist
            const fileid = uuid.v5(dataIn.name, uuid.v1());
            let d = [];
            let dv = {
              fileid: _self.#url + fileid,
              name: dataIn.name,
              index: dataIn.index // index ini isinya object of string key and array value.
            };
            d.push(dv);

            fs.writeFile(index, JSON.stringify(d), function(err) {
              if (err) reject(err);
              else {
                resolve(fileid);
              }
            });
          } else { // file index exist.
            // handle update file index or update table here.
            // check if file able to read write
            fs.access(index, fs.constants.R_OK && fs.constants.W_OK, function (err) {
              if (err) reject(err);
              fs.readFile(index, function(err, data) {
                if (err) reject(err);
                let d = JSON.parse(data.toString());
                d.forEach(function(c, i, a) {
                  if (c.name == dataIn.name) {
                    // bandingkan, banyak mana record di index datain atau index di c.
                    let l = (Object.keys(dataIn.index).length > Object.keys(c.index).length);
                    if (l) {
                      for (const prop in dataIn.index) {
                        // loop yang terbesar, kalau lebih besar datain, insert selisih ke c.
                        if (!c.index.hasOwnProperty(prop)) {
                          c.index[prop] = dataIn.index[prop];
                        }
                      }
                    } else {
                      for (const prop in c.index) {
                        // kalau lebih besar c, hapus selisih dari c.
                        if (!dataIn.index.hasOwnProperty(prop)) {
                          delete c.index[prop];
                        }
                      }
                    }
                  }
                  a[i] = c;
                });
                // console.log(d);

                // write to same file here.
                fs.writeFile(index, JSON.stringify(d), function (err) {
                  if (err) reject(err);
                  else resolve(true);
                });
              });
            });
          }
        });
      });
    } else {
      if (dstType === 'record') {
        // insert record.
      }
      // returnfs.writeFileSync(dst, dataIn);
    }

  }

  /**
   * This function is only act as one purpose only. Download file.
   * @param {String} source Source of data, either table or record, this is a place where we find our data.
   * @param {String} dataIn Keyword of data or record we find. Each data or record is a file, this is keyword of that file.
   *                 If this value is falsy (false, "", [], 0, null, undefined, ...), this function will download index file.
   * @returns {Object}
   */
  #downloadJson(source, dataIn) {
    const dstType = source;
    const _self = this;
    
    if (dstType === 'table') {
      // read information about table here
      return new Promise(function(resolve, reject) {
        fs.access(_self.#url + "/index.json", fs.constants.F_OK | fs.constants.R_OK, function (err) {
          if (err) reject(err);
          fs.readFile(_self.#url + "/index.json", function (err, data) {
            if (err) reject(err);
            const d = JSON.parse(data);
            if (dataIn) {
              // user filter, slice, splice instead of foreach.
              d.forEach(function(c, i, a) {
                if (dataIn.hasOwnProperty('name')) {
                  if (c.name == dataIn.name) {
                    if (!dataIn.hasOwnProperty('index')) {
                      resolve(c);
                    }
                  }
                  if (dataIn.hasOwnProperty('index')) {
                    let found = [];
                    for (const prop in dataIn.index) {
                      if (c.index[prop] == dataIn.index[prop]) {
                        // FIXME: ini akan bikin found berisi semua yang mengandung 2 kriteria index.
                        //      mungkin duplikat juga.
                        found.push(c);
                      }
                    }
                    resolve(found);
                  }
                }
              });
            } else {
              resolve(d);
            }
          });
        })
      });
    } else if (dstType === 'record') {
      // read information about record here
    }
  }

  /**
   * Create table with structure in it. 
   * @param {string} tableName Name of table to be create
   * @param {array} index Object of table table index
   */
  async createTable(tableName, index) {
    let data = {
      fileid: '',
      name: tableName,
      index: {}
    };

    index.forEach(function(c, i, a) {
      data.index[c] = Array();
    });

    return await this.#uploadJson('table', data).then(function(fileid) {
      return fileid;
    }).catch(function(err) {
      // console.log(err);
      return null;
    });
  }

  /**
   * List all table in database.
   * @returns Promise
   */
  listTable() {
    // use adapter to list table here.
    // read the index of table.
    const _self = this;
    return new Promise(function(resolve, reject) {
      fs.access(_self.#url + "/index.json", fs.constants.F_OK | fs.constants.R_OK, function (err) {
        if (err) reject(err);
        fs.readFile(_self.#url + "/index.json", function(err, data) {
          if (err) reject(err);
          resolve(JSON.parse(data));
        });
      })
    });
  }

  /**
   * Read table from database.
   * @param {String} tableName Name of table want to read.
   * @returns Object
   */
  async readTable(tableName) {
    // use adapter to read table here.
    return await this.#downloadJson('table', { name: tableName })
    .then(function(data) {
      return data;
    }).catch(function(err) {
      console.log(err);
      return null;
    });
  }

  /**
   * Update table with structure in it. 
   * @param {string} tableName Name of table to be update
   * @param {array} index Object of table table index
   */
  async updateTable(tableName, index) {
    // use adapter to update table here.
    const _self = this;
    
    let t = await _self.createTable(tableName, index).then(function (result) {
      // console.log(result);
      return result;
    }).catch(function (error) {
      // console.log(error);
      return error;
    });

    return t;
  }

  /**
   * Find table by criteria.
   * @param {Object} query Search criteria of table.
   * @example This is query example:
   *  {
   *    name: 'name',
   *    index: {
   *      username: 'name',
   *      uid: 43
   *    }
   *  }
   * @returns Object
   */
  async queryTable(query) {
    const _self = this;
    // let q = {
    //   name: 'name',
    //   index: {
    //     username: 'name',
    //     uid: 43
    //   }
    // };

    // 1. check if contain name, if yes, download by name.
    // 2. if name not present 
    return await this.#downloadJson('table')
      .then(function (data) {
        return data;
      }).catch(function (err) {
        console.log(err);
        return null;
      });
  }

  async deleteTable(tableName) {
    // use adapter to delete table here.
    const _self = this;
    // slice splice

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

module.exports = File;