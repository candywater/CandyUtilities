import * as fs from 'node:fs/promises';
import { inputfolder, shareKey, CTRCount, outputfolder, output2folder } from '../config.js'
import { getShareKeyBytes, encryptBytes, decryptBytes } from "../encryption/aes.js"
import aesjs from "aes-js"

var files = await fs.readdir(inputfolder)
var keyBytes = getShareKeyBytes(shareKey);
console.log(keyBytes)

files.forEach(async fileName => {
    var file = await readFile(inputfolder + fileName)
    var encryptedBytes = encryptBytes(file, keyBytes, CTRCount);
    writeFile(outputfolder + fileName + '.aes', encryptedBytes);
    
    var decryptedBytes = decryptBytes(encryptedBytes, keyBytes, CTRCount);
    writeFileUTF8Text(output2folder + fileName + '.jpg', decryptedBytes);
})

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
    // if (filePath.includes(""))        console.log(fileData)
    fs.writeFile(filePath, fileData);
}

/**
 * 
 * @param {string} filePath 
 * @param {Buffer} fileData 
 */
function writeFileBase64(filePath, fileData) {
    let base64 = Buffer.from(fileData, 'binary').toString('base64');
    fs.writeFile(filePath, base64);
}


/**
 * 
 * @param {string} filePath 
 * @param {Buffer} fileData 
 */
function writeFileUTF8Text(filePath, fileData) {
    // if (filePath.includes(""))        console.log(fileData)
    let text = aesjs.utils.utf8.fromBytes(fileData);
    fs.writeFile(filePath, text);
}