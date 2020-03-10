'use strict';

const rsa = require('../src/rsa');
const bc = require('bigint-conversion');
const bitLength = 256;

let keyPair, publicKey, privateKey;
let codMsg, decMsg;
const rawMsg = "ho";

keyPair = rsa.keyGenerator(bitLength);
publicKey = keyPair.publicKey;
privateKey = keyPair.privateKey;

console.log("Raw message: " + rawMsg);

codMsg = publicKey.encrypt(rawMsg);

console.log("Coded message: " + codMsg);

decMsg = keyPair.privateKey.encrypt(codMsg);

console.log("Decoded message: " + decMsg);
