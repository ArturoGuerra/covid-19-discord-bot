/*
Loads Bot token and other configuration data
*/

interface Config {
    token:  string;
    prefix: string;
}

function ConfigLoader(): Config {
    const config :Config = {
        token: process.env.TOKEN || process.exit(1),
        prefix: process.env.PREFIX || '!'
    }

    return config;
}

export default ConfigLoader
export { ConfigLoader, Config }