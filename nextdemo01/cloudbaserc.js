const { envId, siteAuthKey } = require("./config");

module.exports = {
    envId,
    functionRoot: "./cloudfunctions",
    functions: [
        {
            name: "site-cms-data",
            config: {
                // 超时时间
                timeout: 30,
                // 环境变量
                envVariables: {
                    SITE_AUTH_KEY: siteAuthKey
                },
                runtime: "Nodejs8.9",
                installDependency: true
            },
            handler: "index.main"
        }
    ]
};