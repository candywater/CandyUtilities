import aesjs from "aes-js"

/**
 * 
 * @param {string} key 
 * @returns string
 */
function getShareKeyBytes(key) {
    var keyBytes = Buffer.alloc(32);
    var keyStringBytes = Buffer.from(key, 'utf-8');
    keyStringBytes.forEach((value, index) => { keyBytes[index] = value })
    return keyBytes;
}

/**
 * for browser
 * @param {string} key 
 * @returns {Uint8Array}
 */
function getShareKeyBytesForBrowser(key) {
    var keyBytes = new Uint8Array(32);
    var encoder = new TextEncoder();
    var keyStringBytes = encoder.encode(key);
    keyStringBytes.forEach((value, index) => { keyBytes[index] = value });
    return keyBytes;
}

/**
 * 
 * @param {Buffer} file 
 * @param {Buffer} keyBytes
 * @param {number} CTRCount
 * @returns Buffer
 */
function encryptBytes(file, keyBytes, CTRCount) {
    var aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(CTRCount));
    var encryptedBytes = aesCtr.encrypt(file);
    return encryptedBytes;
}

/**
 * 
 * @param {Buffer} file 
 * @param {Buffer} keyBytes
 * @param {number} CTRCount
 * @returns Buffer
 */
function decryptBytes(file, keyBytes, CTRCount) {
    var aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(CTRCount));
    var encryptedBytes = aesCtr.decrypt(file);
    return encryptedBytes;
}

export {
    getShareKeyBytes,
    getShareKeyBytesForBrowser,
    encryptBytes,
    decryptBytes
}