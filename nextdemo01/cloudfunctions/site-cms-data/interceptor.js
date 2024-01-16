const { Provider } = require("./provider");

const supportedApi = Reflect.ownKeys(Provider);

function vertifyAuth(ctx) {
    // 前面在cloudbase.js中规定的环境变量
    return ctx.key === process.env.SITE_AUTH_KEY;
}

function isValidBody(body) {
    return (
        "key" in body && // 验证身份的随机密钥
        "params" in body && // 携带调用服务需要的参数
        "api" in body && // 调用服务名称
        supportedApi.includes(body.api)
    );
}

module.exports = {
    vertifyAuth,
    isValidBody
};