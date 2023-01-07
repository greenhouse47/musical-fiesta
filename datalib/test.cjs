const { expect, assert} = require('chai')
.use(require('chai-bytes'));

const fs = require('fs');
const uuid = require('uuid');
const chaiFiles = require('chai-files');
const file = chaiFiles.file;
const fileDriver = require('./driver/file');
let dbfile;
let dbloc = '/tmp/testfiledrv/';

fs.rmSync(dbloc, { recursive: true, force: true });
fs.mkdirSync(dbloc);

// const { SkynetClient, genKeyPairFromSeed } = require('@skynetlabs/skynet-nodejs');
// const Skydb = require('./index.cjs');

// const skyneturl = "https://skynetfree.net";
// const skynetapi = "SC31I98C2CCA2F3B8RB8RFFVOHAA6MEH5CPCRUMGUICH0RFO1K1G";
// const skyseed = "this seed should be fairly long for security";
// const client = new SkynetClient(skyneturl, { skynetApiKey: skynetapi });
// const { publicKey, privateKey } = genKeyPairFromSeed(skyseed);

// const dataKey = "myApp";
// const json = { example: "This is some example JSON data." };

describe('datalib', function () {
  describe('#test create table', function () {
    it('table should be created.', async function () {

      // const skd = new Skydb(skyneturl, skynetapi, skyseed);
      // let datain = {
      //   testkey: 'testvalue'
      // };
      // const gb = await skd.createTable('datalibtest', datain);
      // console.log('from gb: ', gb);
      // assert.equal(gb.err, null, 'must null');
      // skd.createTable('datalibtest', datain).then(function (result) {
      //   console.log("from then: ", result);
      // });
      
      // const ob = await client.dbV2.setJSON(privateKey, 'datalibtest', datain);
      // console.log(ob);

    })
  })
});

describe('driver', function() {
  describe('#test file storage driver.', function() {
    it('Initiate fileDriver, Should written to file', async function () {
      dbfile = await new fileDriver(dbloc, null, null, null, null);
      expect(file(dbloc)).to.exist;
    }),

    it('dbfile.createTable, Should create table using file driver.', async function() {
      // console.log('from mocha', dbfile);
      let t = await dbfile.createTable('user', ['username', 'uid']).then(function (result) {
        console.log(result);
        return result;
      }).catch(function (error) {
        // console.log(error);
        return error;
      });

      assert.equal(uuid.validate(t), true, 'Return of create table is not uuid.');
    }),

    it('dbfile.listTable, Should read table from file using file driver', async function() {
      let t = await dbfile.listTable();
      // console.log(t);
      assert.equal(t[0].name, 'user', 'Table not equal with table insert.');
    }),

      it('dbfile.updateTable, Should update table property, add index.', async function() {
      let t = await dbfile.updateTable('user', ['username', 'uid', 'email']).then(function (result) {
        // console.log(result);
        return result;
      }).catch(function (error) {
        // console.log(error);
        return error;
      });

      assert.isTrue(t, 'Update fail return false.')
      // console.log('t add index: ', t);
    }),

      it('dbfile.updateTable, Should update table property, subtract index.', async function() {
      let t = await dbfile.updateTable('user', ['username', 'uid']).then(function (result) {
        // console.log(result);
        return result;
      }).catch(function (error) {
        // console.log(error);
        return error;
      });

      assert.isTrue(t, 'Update fail return false.');
      // console.log('t substract index: ', t);
    })

    it('dbfile.readTable, Should get and read table content.', async function() {
      const tablename = 'user';
      let t = await dbfile.readTable(tablename).then(function(data) {
        return data;
      }).catch(function(err) {
        return err;
      });

      console.log(t);
      assert.equal(t.name, tablename, 'Table name not equal to what we need.');
    }),

    it('dbfile.queryTable, Should query and read table content.', async function () {
      const tablename = 'user';

      // console.log('from mocha', dbfile);
      let i = await dbfile.createTable('identity', ['fname', 'idid']).then(function (result) {
        console.log('not error');
        console.log(result);
        return result;
      }).catch(function (error) {
        console.log('error');
        console.log(error);
        return error;
      });

      console.log(i);

      assert.equal(uuid.validate(i), true, 'Return of create table is not uuid.');

      // let t = await dbfile.queryTable(tablename).then(function (data) {
      //   return data;
      // }).catch(function (err) {
      //   return err;
      // });

      // console.log(t);
      // assert.equal(false, true, 'Query return are true, expected false.');
    })
  })
})