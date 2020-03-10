'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const bc = require('bigint-conversion');
const bcu = require('bigint-crypto-utils');
const _ONE = BigInt(1);

module.exports.keyGenerator =   function (bitLength){
    let p, q, n, phi, e, d;

    let prvKeys = {};

    e = BigInt(65537);

    do{
        p =   bcu.primeSync(Math.floor(bitLength/2) + 1);
        q =   bcu.primeSync(Math.floor(bitLength/2));

        n =  p * q;
    }while(p === q || bcu.bitLength(n) != bitLength);

    phi =  (p - _ONE) * (q - _ONE);

    d =  bcu.modInv(e, phi);

    const publicKey = new PublicKey(e, n);
    const privateKey = new PrivateKey(d, n);

    //console.log("e: " + bc.bigintToHex(e));
    //console.log("d: " + bc.bigintToHex(d));
    //console.log("n: " + bc.bigintToHex(n));
    //console.log("e inv: " + bc.bigintToHex(bcu.modInv(d, phi)));

    return {publicKey: publicKey, privateKey: privateKey};
};

const PublicKey = class PublicKey{

    constructor(e, n) {
        this.e = e;
        this.n = n;
    }

    // Encrypt function
    encrypt(message){
        let c, m;
        m = bc.textToBigint(message);
        //c = m;
        c = bcu.modPow(m, this.e, this.n);
        return bc.bigintToText(c);
    }
};

const PrivateKey = class PrivateKey{
    constructor(d, n){
        this.d = d;
        this.n = n;
    }

    decrypt(message){
        let c, m;
        c = bc.textToBigint(message);
        //m = c;
        m = bcu.modPow(c, this.d, this.n);
        return bc.bigintToText(m);
    }
};
