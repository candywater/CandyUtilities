export const btoa = (text) => Buffer.from(text, 'binary').toString('base64');
export const atob = (base64) => Buffer.from(base64, 'base64').toString('binary');