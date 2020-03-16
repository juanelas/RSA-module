'use strict';

//import * as Rsa from '../src/rsa';
//import * as bc from 'bigint-conversion';
const Rsa = require('../rsa.cjs');
const bc = require('bigint-conversion');

const bitLength = 1024*4;
const message = "Hello world!";
const hash = "hashoooo";
let rsa = new Rsa.rsa(bitLength);

//rsa.decrypt(rsa.encrypt(bc.textToBigint(message)));

console.log("Decrypted message: " + rsa.decrypt(rsa.encrypt(message)));
console.log("Verified hash: " + rsa.verify(rsa.sign(hash)));
