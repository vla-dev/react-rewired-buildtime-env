import CommandExecutor from './commandExecutor';
import logger from './utils/logger';

const webpack = require('webpack')
let debugOn = false, customFormatter = null;

const mapCommands = (_commands) => {
    return Object.keys(_commands)
        .map(_cmd => ({
            key: _cmd,
            value: _commands[_cmd]
        }));
}

const executeCommands = (_commands) => {
    const _filteredCommands = mapCommands(_commands);
    const commandExecutor = new CommandExecutor(debugOn, customFormatter);

    const responses = _filteredCommands.map(_cmd => ({
        key: _cmd.key,
        value: commandExecutor.execute(_cmd)
    }))

    return responses
        .filter(_cmd => _cmd.value)
        .reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
}

const rewireWithEnv = ({
    config,
    envKey = 'BUILDTIME_ENV',
    vars = {},
    commands = {},
    debug = false,
    formatter = null
}) => {

    logger(c => c.cyan('Start executing commands'));
    debugOn = debug;
    customFormatter = formatter;

    config.plugins = (config.plugins || [])
        .concat([new webpack.DefinePlugin({
            [`process.env.${envKey}`]: JSON.stringify({
                ...(Object.keys(vars).length > 0 && vars),
                ...(Object.keys(commands).length > 0 && executeCommands(commands, formatter))
            })
        })])

    return config
}

export { rewireWithEnv }
