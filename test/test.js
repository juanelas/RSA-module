'use strict';

const rsa = require('../src/rsa');
const bc = require('bigint-conversion');
const bitLength = 48;

let keyPair, publicKey, privateKey;
let codMsg, decMsg;
const rawMsg = "Hello!";

keyPair =  rsa.keyGenerator(bitLength);
publicKey =  keyPair.publicKey;
privateKey =  keyPair.privateKey;

console.log("Raw message: " + rawMsg);
//console.log("Raw hex message: " + bc.bigintToHex(bc.textToBigint(rawMsg)));

codMsg = publicKey.encrypt(rawMsg);

console.log("Coded message: " + codMsg);
//console.log("Coded hex message: " + bc.bigintToHex(bc.textToBigint(codMsg)));

decMsg = privateKey.decrypt(codMsg);

console.log("Decoded message: " + decMsg);
//console.log("Decoded hex message: " + bc.bigintToHex(bc.textToBigint(decMsg)));
