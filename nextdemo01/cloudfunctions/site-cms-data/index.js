const tcb = require("tcb-admin-node");
const { vertifyAuth, isValidBody } = require("./interceptor");
const { dispatch } = require("./provider");

module.exports.main = async (event, context) => {
    let ctx = {
        envId: context.namespace
    };

    // 验证传入的数据
    try {
        const body = JSON.parse(event.body);
        if (isValidBody(body)) {
            ctx = {
                ...ctx,
                ...body
            };
        } else {
            return {
                success: false,
                msg: "传入数据不合法"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            msg: "请检查body格式"
        };
    }

    // 验证身份
    if (!vertifyAuth(ctx)) {
        return {
            success: false,
            msg: "身份验证失败"
        };
    }

    // 给上下文绑定db
    const app = tcb.init({
        env: ctx.envId
    });
    ctx.db = app.database({
        env: ctx.envId
    });

    // 服务调用
    try {
        const result = await dispatch(ctx);
        return {
            success: true,
            result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            msg: error.message
        };
    }
};