export class rsa {
    /**
     *
     * @param {number} bitLength
     */
    constructor(bitLength$1: any);
    p: bigint;
    q: bigint;
    n: bigint;
    phi: bigint;
    e: any;
    d: any;
    stat: boolean;
    /**
     *
     * @param {number} m
     * @returns {bigint|null}
     */
    encrypt(m: number): bigint;
    /**
     *
     * @param {number} s
     * @returns {string|null}
     */
    verify(s: number): string;
    /**
     *
     * @param {number} c
     * @returns {string|null}
     */
    decrypt(c: number): string;
    /**
     *
     * @param {number} h
     * @returns {bigint|null}
     */
    sign(h: number): bigint;
    /**
     *
     * @param {number} m
     * @returns {boolean}
     */
    valVerify(m: number): boolean;
    /**
     *
     * @param {number} bl
     * @returns {boolean}
     */
    bitLengthVerify(bl: number): boolean;
}
