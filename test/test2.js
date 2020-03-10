'use strict';

const rsa2 = require('../src/rsa2');
const bc = require('bigint-conversion');
const bitLength = 256;

let rsa = new rsa2(bitLength);

console.log("Decrypted encrypted message: " + bc.bigintToText(rsa.decrypt(rsa.encrypt(BigInt(bc.textToBigint("Hello BB"))))));

console.log("Verified signed message: " + bc.bigintToText(rsa.verify(rsa.sign(BigInt(bc.textToBigint("Message to sign"))))));
