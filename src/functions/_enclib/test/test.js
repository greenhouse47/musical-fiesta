const { expect, assert } = require('chai')
  .use(require('chai-bytes'));
const nacl = require('tweetnacl');
const _enclib = require('../_enclib');
const { Buffer } = require('buffer');
const { doesNotMatch } = require('assert');
const { buffToString } = require('../_enclib');

// keypair to test.
const keypair = nacl.box.keyPair();

describe('_enclib', function () {
  describe('#test _appendBuffer', function () {
    it('Buffer should be appended', function () {
      const buffer1 = new Uint8Array([1, 2]);
      const buffer2 = new Uint8Array([3, 4]);
      const buffer3 = _enclib._appendBuffer(buffer1, buffer2);
      assert.equalBytes(buffer3, [1, 2, 3, 4], '_enclib.appendBuffer fail.');
      // assert.equal(true, true, 'valid true value');
    })
  }),
  describe('#test generate seed', function() {
    it('Generate seed from entropy', function () {
      assert.equal(_enclib.generateSeed().split(' ').length, 48, 'Seed not generated.');
    })
  }),
  describe('#keypair to seed', function() {
    it('Convert keypair to seed', function() {
      const seed = _enclib.keypairToSeed(keypair);
      assert.equal(seed.split(' ').length, 48, 'Seed are not 48 word.');
    })
  }),
  describe('#seed to keypair', function() {
    it('Convert seed to keypair', function () {
      const seed = _enclib.keypairToSeed(keypair);
      // console.log(seed);
      const keys = _enclib.seedToKeypair(seed);
      assert.equalBytes(keys.publicKey, keypair.publicKey, 'Public key output are not equal to input.');
      assert.equalBytes(keys.secretKey, keypair.secretKey, 'Secret key output are not equal to input.');
    });
  }),
  describe('#encrypt a message with private key and decrypt with public key', function () {
    it('Encrypt and decrypt a message and verify it\'s content.', function () {
      const keys = _enclib.seedToKeypair(_enclib.generateSeed());
      const msg = "Hello world!";
      // send from keys to keypair
      const encmsg = _enclib.encrypt(Buffer.from(msg, 'utf8'), keypair.publicKey, keys.secretKey);
      // receive from keys to keypair
      const decmsg = _enclib.decrypt(encmsg, keys.publicKey, keypair.secretKey);
      assert.strictEqual(Buffer.from(decmsg).toString('utf8'), msg, 'Encrypt decrypt fail.');
    })
  }),
  describe('#Convert from buffer to string utf8', function () {
    it('Convert buffer to string.', function () {
      const str = 'Hello world!'
      assert.strictEqual(str, _enclib.buffToString(Buffer.from(str)), 'Fail to convert buffer to string.');
    })
  }),
  describe('#Seal secret message with password and try to open it.', function () {
    it('Seal message and open the seal', async function () {
      const msg = 'Hello world!';
      const msgSeal = await _enclib.secretSeal(msg, "s3CretPass");
      assert.strictEqual(_enclib.secretOpen(msgSeal, 's3CretPass'), msg, 'Fail to seal and open msg');
    })
  }),
  describe('#Generate signing keypair.', function () {
    it('Generate signing keypair in Object of string.', function () {
      const skp = _enclib.genSigningKeypair();
      assert.strictEqual(typeof(skp.publicKey), 'string', 'Type of public key is not a string.');
      assert.strictEqual(typeof(skp.secretKey), 'string', 'Type of private key is not a string.');
    })
  }),
  describe('#Sign and unsign message with generated keypair.', function () {
    it('Sign and unsign a message.', function () {
      const msg = 'Hello, this is a message!';
      const skp = _enclib.genSigningKeypair();
      
      const signedMsg = _enclib.signMessage(msg, skp.secretKey);
      const unsignedMsg = _enclib.unsignMessage(signedMsg, skp.publicKey);

      assert.strictEqual(unsignedMsg, msg, 'Sign and unsign message fail.');
    })
  }),
  describe('#ECDH for shared secret', function(){
    it('test if ECDH are viable for compute shared secret.', async function(){
      const {
        createECDH
      } = await import('node:crypto');

      // Generate Alice's keys...
      const alice = createECDH('secp521r1');
      const aliceKey = alice.generateKeys();

      // Generate Bob's keys...
      const bob = createECDH('secp521r1');
      const bobKey = bob.generateKeys();

      // for (i=0; i<4; i++) {
        // Exchange and generate the secret...
        const aliceSecret = alice.computeSecret(bobKey);
        const bobSecret = bob.computeSecret(aliceKey);

        // console.log(aliceSecret.toString('hex'));
        // console.log(bobSecret.toString('hex'));
      // }

      assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
    })
  })
});