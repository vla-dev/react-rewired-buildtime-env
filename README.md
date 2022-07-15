# Rewire react app with custom environment variables (buildtime) #

### How to use: ###

```
npm install react-rewired-buildtime-env
```

config-overrides.js
```javascript
const { rewireWithEnv } = require('react-rewired-buildtime-env');
const customVarName = 'CUSTOM_VAR_NAME';

module.exports = (webpackConfig) => {
    const withCustomEnvConfig = rewireWithEnv({
        webpackConfig,
        envKey: 'CUSTOM_ENV_VAR',
        commands: {
            gitCommit: 'git rev-parse --short HEAD',
            npmVersion: 'npm -v',
            ...
        },
        vars: {
            var1: 'CUSTOM_VARIABLE',
            [customVarName]: '<custom var value>'
        }
    });

    return withCustomEnvConfig;
}
```

Output at ` process.env.CUSTOM_ENV_VAR `:

```js
{
    gitCommit: "8e86fab"
    npmVersion: "8.3.1",
    var1: "CUSTOM_VARIABLE",
    CUSTOM_VAR_NAME: '<custom var value>'
}
```

## Working with custom scripts: ##
- having a custom script at a certain path (e.g: 'src/scripts/myCustomScript.js)
- add it to `package.json`
    ```json
     "scripts": {
        "myScript": "node src/scripts/myCustomScript.js",
    }
    ```
- then, in `config-overrides.js`
    ```javascript
    module.exports = (webpackConfig) => {
        const withCustomEnvConfig = rewireWithEnv({
            webpackConfig,
            envKey: 'CUSTOM_ENV_VAR',
            commands: {
                myScriptResult: 'npm run myScript'
            }
        });

        return withCustomEnvConfig;
    }
    ```

## Arguments (default values): ##
* `webpackConfig`,
* `envKey` = 'BUILDTIME_ENV',
* `commands` = {},
* `vars` = {},
* `debug` = false,
* `formatter` = null (function)
    ```javascript
    module.exports = (webpackConfig) => {
        const withCustomEnvConfig = rewireWithEnv({
            webpackConfig,
            envKey: 'CUSTOM_ENV_VAR',
            commands: {},
            vars: {},
            debug: true,
            formatter: (res) => {
                // by default, when there are multiple lines
                // the result will be an array of lines

                let response = res.trim().split('\n');

                // get rid of unnecessary stuff
                if(response.includes('*')) {
                    response = response.replace('*', '');
                }

                return response;
            }
        });

        return withCustomEnvConfig;
    }
    ```
    
     
