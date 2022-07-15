const { rewireWithEnv } = require('react-rewired-buildtime-env');

module.exports = (webpackConfig) => {
    const withScriptsResult = rewireWithEnv({
        webpackConfig,
        envKey: 'CUSTOM_ENV',
        commands: {
            authorDate: 'git --no-pager log --pretty=format:"%ad" -n1',
            author: 'git --no-pager log --pretty=format:"%an <%ae>" -n1',
            branch: 'git branch | findstr  "*"',
            shaShort: 'git rev-parse --short HEAD',
            npmVersion: 'npm -v',
            nodeVersion: 'node -v',
            customScriptResponse: 'npm run myScript'
        },
        vars: {
            'TEST': 'CUSTOM_VALUE'
        },
        debug: true
    });

    return withScriptsResult;
}