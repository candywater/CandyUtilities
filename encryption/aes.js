import * as fs from 'node:fs/promises';
import { folder, shareKey, CTRCount, outputfolder } from './config.js'
import aesjs from "aes-js"

var files = await fs.readdir(folder)
var keyBytes = getShareKeyBytes(shareKey);

files.forEach(async fileName => {
    var file = await readFile(folder + fileName)
    var encryptedBytes = encryptBytes(file);
    writeFile(outputfolder + fileName, encryptedBytes);
    // var decryptedBytes = decryptBytes(encryptedBytes);
    // writeFile(folder + fileName + '.aes', decryptedBytes);
})


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
 * 
 * @param {Buffer} file 
 * @returns Buffer
 */
function encryptBytes(file) {
    var aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(CTRCount));
    var encryptedBytes = aesCtr.encrypt(file);
    return encryptedBytes;
}

/**
 * 
 * @param {Buffer} file 
 * @returns Buffer
 */
function decryptBytes(file) {
    var aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(CTRCount));
    var encryptedBytes = aesCtr.decrypt(file);
    return encryptedBytes;
}

/**
 * 
 * @param {string} filePath 
 * @returns Buffer
 */
async function readFile(filePath) {
    var file = await fs.readFile(filePath)
    return file
}

/**
 * 
 * @param {string} filePath 
 * @param {Buffer} fileData 
 */
function writeFile(filePath, fileData) {
    fs.writeFile(filePath + ".aes", fileData);
}