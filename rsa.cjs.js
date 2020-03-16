'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bcu = require('bigint-crypto-utils');
var bc = require('bigint-conversion');

const _ONE = BigInt(1);

class rsa {
    constructor(bitLength) {
        do {
            this.p = bcu.primeSync(Math.round(bitLength / 2) + 1);
            this.q = bcu.primeSync(Math.round(bitLength / 2));
            this.n = this.p * this.q;
        } while (this.p === this.q || bcu.bitLength(this.n) != bitLength);

        this.phi = (this.p - _ONE) * (this.q - _ONE);
        this.e = BigInt(65537);
        this.d = bcu.modInv(this.e, this.phi);
        this.stat = true;
    }

    // encrypt message function
    encrypt(m) {
        m = bc.textToBigint(m);
        if (this.valVerify(m)) {
            console.log("Message to encrypt > n");
            return null;
        } else return bcu.modPow(m, this.e, this.n);
    }

    // verify signed hash function
    verify(s) {
        if (this.valVerify(s)) {
            console.log("Message to verify > n");
            return null;
        } else return bc.bigintToText(bcu.modPow(s, this.e, this.n));
    }

    // decrypt message function
    decrypt(c) {
        if (this.valVerify(c)) {
            console.log("Message to decrypt > n");
            return null;
        } else return bc.bigintToText(bcu.modPow(c, this.d, this.n));
    }

    // sign hash function
    sign(h) {
        h = bc.textToBigint(h);
        if (this.valVerify(h)) {
            console.log("Message to sign > n");
            return null;
        } else return bcu.modPow(h, this.d, this.n);
    }
    // verify that message is smaller than n
    valVerify(m) {
        if ((m > this.n))
            console.log("message is greater than n");
        return m > this.n;
    }
    // verify bitLength
    bitLengthVerify(bl) {
        if (bl % 8) return false;
        else return true;
    }
}

exports.rsa = rsa;
