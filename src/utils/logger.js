const clc = require('cli-color');
const log = console.log;

export default (value) => {
    if (value && typeof value === 'function') {
        const message = value(clc);
        log(message);
    } else {
        log(value);
    }
}
