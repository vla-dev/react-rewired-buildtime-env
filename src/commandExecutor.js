import logger from './utils/logger';
const { execSync } = require("child_process");

const isWin = process.platform === "win32";
const path = 'cd ' + process.cwd() + (isWin ? ' && ' : ';');

export default class CommandExecutor {
    constructor(debugOn, customFormatter) {
        this.debugOn = debugOn;
        this.customFormatter = customFormatter;
    }

    formatResponse(decoded) {
        let response = null;

        if (this.customFormatter && typeof this.customFormatter === 'function') {
            response = this.customFormatter(decoded);
        } else {
            const responseLines = decoded.trim().split('\n');

            response = responseLines.map(function (el) {
                return el.replace('\n ', '').trim();
            }).filter(Boolean);

            if (response.length === 1) {
                response = response[0];
            }
        }

        return response;
    }

    execute(_command) {
        const dec = new TextDecoder();

        try {
            const executionResponse = execSync(path + _command.value);

            if (Buffer.isBuffer(executionResponse)) {
                const decoded = dec.decode(executionResponse.slice())
                let response = this.formatResponse(decoded);

                return response;
            }
        } catch (e) {
            logger(c => c.yellow(`Failed to execute command (${_command.key} : ${_command.value}). Skipping... `));

            if (this.debugOn) {
                logger(c => c.red(e.message));
            }
        }
    }
} 