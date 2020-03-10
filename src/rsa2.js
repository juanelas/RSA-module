'use strict';

const bcu = require('bigint-crypto-utils');
const bc = require('bigint-conversion');
const _ONE = BigInt(1);

class rsa2{

    constructor(bitLength){
        do{
            this.p = bcu.primeSync(Math.floor(bitLength/2)+1);
            this.q = bcu.primeSync(Math.floor(bitLength/2));
            this.n = this.p * this.q;
        }while (this.p === this.q || bcu.bitLength(this.n) != bitLength);

        this.phi = (this.p - _ONE) * (this.q - _ONE);
        this.e = BigInt(65537);
        this.d = bcu.modInv(this.e, this.phi);

        console.log("Coprimes? if == 1, yes! : " + bc.bigintToHex(bcu.gcd(this.e, this.phi)));

        console.log("e: " + bc.bigintToHex(this.e));
        console.log("d: " + bc.bigintToHex(this.d));
        console.log("n: " + bc.bigintToHex(this.n));
        console.log("e inv: " + bc.bigintToHex(bcu.modInv(this.d, this.phi)));

    }

    encrypt(m){
        let c = bcu.modPow(m, this.e, this.n);
        return c;
    }

    verify(s){
        let h = bcu.modPow(s, this.e, this.n);
        return h;
    }

    decrypt(c){
        let m = bcu.modPow(c, this.d, this.n);
        return m;
    }

    sign(h){
        let s = bcu.modPow(h, this.d, this.n);
        return s;
    }
} module.exports = rsa2;
