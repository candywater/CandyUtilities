import { fileURLToPath } from 'url';
import { dirname } from 'path';

const btoa = (text) => Buffer.from(text, 'binary').toString('base64');
const atob = (base64) => Buffer.from(base64, 'base64').toString('binary');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {
    btoa,
    atob,
    __filename,
    __dirname,
}