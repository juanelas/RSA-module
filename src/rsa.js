'use strict';

import * as bcu from 'bigint-crypto-utils';
import * as bc from 'bigint-conversion';

const _ONE = BigInt(1);

export class rsa {
    /**
     *
     * @param {number} bitLength
     */
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
    /**
     *
     * @param {number} m
     * @returns {bigint|null}
     */
    encrypt(m) {
        m = bc.textToBigint(m);
        if (this.valVerify(m)) {
            console.log("Message to encrypt > n");
            return null;
        } else return bcu.modPow(m, this.e, this.n);
    }

    // verify signed hash function
    /**
     *
     * @param {number} s
     * @returns {string|null}
     */
    verify(s) {
        if (this.valVerify(s)) {
            console.log("Message to verify > n");
            return null;
        } else return bc.bigintToText(bcu.modPow(s, this.e, this.n));
    }

    // decrypt message function
    /**
     *
     * @param {number} c
     * @returns {string|null}
     */
    decrypt(c) {
        if (this.valVerify(c)) {
            console.log("Message to decrypt > n");
            return null;
        } else return bc.bigintToText(bcu.modPow(c, this.d, this.n));
    }

    // sign hash function
    /**
     *
     * @param {number} h
     * @returns {bigint|null}
     */
    sign(h) {
        h = bc.textToBigint(h);
        if (this.valVerify(h)) {
            console.log("Message to sign > n");
            return null;
        } else return bcu.modPow(h, this.d, this.n);
    }
    // verify that message is smaller than n
    /**
     *
     * @param {number} m
     * @returns {boolean}
     */
    valVerify(m) {
        if ((m > this.n))
            console.log("message is greater than n");
        return m > this.n;
    }
    // verify bitLength
    /**
     *
     * @param {number} bl
     * @returns {boolean}
     */
    bitLengthVerify(bl) {
        if (bl % 8) return false;
        else return true;
    }
}
