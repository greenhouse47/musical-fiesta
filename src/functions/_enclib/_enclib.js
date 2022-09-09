const bip39 = require('bip39');
const nacl = require('tweetnacl');
const { createHmac } = require('node:crypto');

/**
 * Creates a new Uint8Array based on two different ArrayBuffers
 *
 * @private
 * @param {ArrayBuffers} buffer1 The first buffer.
 * @param {ArrayBuffers} buffer2 The second buffer.
 * @return {ArrayBuffers} The new ArrayBuffer created out of the two.
 */
function _appendBuffer (buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
};

/**
 * Convert keypair of public and private to string seed.
 * 
 * @public
 * @param {Object} keypair Object keypair contain hex string
 * @returns {String} String of seed
 */
function keypairToSeed(keypair) {
  const reval = bip39.entropyToMnemonic(keypair.publicKey);
  return reval.concat(" ", bip39.entropyToMnemonic(keypair.secretKey));
}

/**
 * Create string seed of keypair.
 * 
 * @public
 * @returns {String} String of seed.
 */
function generateSeed() {
  return keypairToSeed(nacl.box.keyPair());
}

/**
 * Convert string seed to Object of keypair.
 * 
 * @public
 * @param {String} seed String of seed
 * @returns {Object} Keypair consist of public and private key in hex
 */
function seedToKeypair(seed) {
  return {
    publicKey: Buffer.from(bip39.mnemonicToEntropy(seed.split(' ').slice(0, 24).join(' ')), 'hex'),
    secretKey: Buffer.from(bip39.mnemonicToEntropy(seed.split(' ').slice(24).join(' ')), 'hex')
  }
}

/**
 * Encrypt message with opposite public key and our private key.
 * 
 * @public
 * @param {String} message Message to be encrypted.
 * @param {Uint8Array} theirPublic Their public key.
 * @param {Uint8Array} mySecret My private key.
 * @returns {Uint8Array} Buffer of encrypted message.
 */
function encrypt(message, theirPublic, mySecret) {
  const nonce = nacl.randomBytes(24);
  return _appendBuffer(nacl.box(
    Buffer.from(message, 'utf8'),
    nonce, theirPublic, mySecret), nonce);
}

/**
 * Decrypt message by using opposite public key and our private key.
 * 
 * @public
 * @param {Uint8Array} message Message to be decrypted.
 * @param {Uint8Array} theirPublic Their public key.
 * @param {Uint8Array} mySecret My private key.
 * @returns {Uint8Array} Buffer of decrypted message.
 */
function decrypt(message, theirPublic, mySecret) {
  const nonce = message.slice(-24);
  return nacl.box.open(message.slice(0, -24), nonce, theirPublic, mySecret);
}

/**
 * Open the seal sealed by secretSeal.
 * 
 * @public
 * @param {Uint8Array} message Encrypted message.
 * @param {String} password Password in string.
 * @returns {String} String of unsealed message.
 */
function secretOpen(message, password) {
  const nonce = message.slice(0, 24);
  const hash = createHmac('sha256', password).digest();
  password = new Uint8Array(hash);
  return buffToString(nacl.secretbox.open(message.slice(24), nonce, password.slice(-32)));
}

/**
 * Seal the message by using password.
 * 
 * @public
 * @param {String} message Plain text message.
 * @param {String} password Password in string.
 * @returns {Uint8Array} Buffer of encrypted message.
 */
function secretSeal(message, password) {
  message = new Uint8Array(Buffer.from(message));
  password = createHmac('sha256', password).digest();
  password = new Uint8Array(password);
  password = password.slice(-32);
  
  const nonce = nacl.randomBytes(24);
  const box = nacl.secretbox(message, nonce, password);
  let reval = new Uint8Array(nonce.length + box.length);
  reval.set(nonce);
  reval.set(box, nonce.length);

  return reval;
}

/**
 * Convert buffer to string utf8
 * 
 * @public
 * @param {Uint8Array} buff Buffer input
 * @returns {String}  String type of buffer.
 */
function buffToString(buff) {
  return Buffer.from(buff).toString('utf8');
}

/**
 * Sign a message with private key and return a signed message in utf8 format.
 * 
 * @public
 * @param {String} message Message string with utf8 format.
 * @param {String} key Private key to sign a message with hex format
 * @returns {String} Signed message in string hex format.
 */
function signMessage(message, key) {
  message = Buffer.from(message, 'utf8');
  message = new Uint8Array(message);

  key = Buffer.from(key, 'hex');
  key = new Uint8Array(key);
  return Buffer.from(nacl.sign(message, key)).toString('hex');
}

/**
 * Open signed message with public key and return a message with no signature in utf8 format.
 * 
 * @public
 * @param {String} message Message string with hex format.
 * @param {String} key Public key to open a message with hex format
 * @returns {String} The message in string utf8 format.
 */
function unsignMessage(message, key) {
  message = Buffer.from(message, 'hex');
  message = new Uint8Array(message);

  key = Buffer.from(key, 'hex');
  key = new Uint8Array(key);
  return buffToString(nacl.sign.open(message, key));
}

/**
 * Generate Public and private key pair in Object of string hex.
 * 
 * @public
 * @returns {Object} A keypair in object of public and private.
 */
function genSigningKeypair() {
  let skp = nacl.sign.keyPair();
  skp.publicKey = Buffer.from(skp.publicKey).toString('hex');
  skp.secretKey = Buffer.from(skp.secretKey).toString('hex');

  return skp;
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  seedToKeypair: seedToKeypair,
  keypairToSeed: keypairToSeed,
  secretOpen: secretOpen,
  secretSeal: secretSeal,
  generateSeed: generateSeed,
  buffToString: buffToString,
  signMessage: signMessage,
  unsignMessage: unsignMessage,
  genSigningKeypair: genSigningKeypair,
  _appendBuffer: _appendBuffer
}