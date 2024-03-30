
//https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript

//https://stackabuse.com/bytes/converting-images-and-image-urls-to-base64-in-node-js/

import * as fs from 'node:fs/promises';
import { inputfolder, outputfolder } from '../config.js'

var files = await fs.readdir(inputfolder)

files.forEach(async fileName => {
    var file = await readFile(inputfolder + fileName)
    let base64Image = Buffer.from(file, 'binary').toString('base64');
    writeFile(outputfolder + fileName, base64Image);
})

// var data = await fs.readFile(inputfolder + files[0])
// let base64Image = Buffer.from(data, 'binary').toString('base64');

// console.log(base64Image);

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
    fs.writeFile(filePath + ".base64", fileData);
}
