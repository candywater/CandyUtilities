
/**
 * https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
 * @param {string} url
 * @param {Function} callback
 */
function toDataURLviaXHR(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
}

/**
 * @param {Blob} arrayBuffer
 * @param {Function} callback
 * @returns base64text
 */
function fileReaderToDataURL(arrayBuffer, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result);
    };
    reader.readAsDataURL(arrayBuffer);
}

/**
* @param {Blob} arrayBuffer
* @param {Function} callback
* @returns base64text
*/
async function urlToDataURL(arrayBuffer, callback) {
    var dataArray = await (await fetch(url)).arrayBuffer();
    var dataBytes = new Uint8Array(dataArray);
    var blob = new Blob([dataBytes]);

    return fileReaderToDataURL(blob, callback)
}

export {
    urlToDataURL,
    fileReaderToDataURL
}