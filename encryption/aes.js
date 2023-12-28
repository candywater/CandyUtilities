import * as fs from 'node:fs/promises';
import { folder, shareKey, CTRCount, outputfolder } from './config.js'
import aesjs from "aes-js"

var files = await fs.readdir(folder)
var keyBytes = getShareKeyBytes(shareKey);

files.forEach(async fileName => {
    var file = await readFile(folder + fileName)
    var encryptedBytes = encryptBytes(file, keyBytes, CTRCount);
    writeFile(outputfolder + fileName, encryptedBytes);
    // var decryptedBytes = decryptBytes(encryptedBytes, keyBytes, CTRCount);
    // writeFile(folder + fileName + '.aes', decryptedBytes);
})

/*

<!-- https://stackoverflow.com/questions/48684703/javascript-how-to-store-images-on-memory-and-load-them-from-memory-insteaid-of -->
    (async () {
        const encryptedBytes = await (await fetch("/doc/year-summary/2023/imgs-encrypted/IMG_042880_(Large).JPG.aes")).arrayBuffer();
        var keyBytes = getShareKeyBytes("candywater")
        const decryptedBytes = decryptBytes(encryptedBytes, keyBytes, 7)
        
        var image = new Image();
        image.src = "data:image/gif;base64,"+btoa(decryptedBytes)
        document.querySelector('img').replaceWith(image);
    })();
*/ 


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