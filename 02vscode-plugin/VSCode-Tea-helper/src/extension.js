const vscode = require('vscode');
const fs = require('fs');
const { reactFunctionComponentTemp, reactComponentIndexTemp, reactComponentLessTemp } = require('./template');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function(context) {
    console.log('恭喜，您的扩展“VSCode-Tea-helper”已被激活！');
    // 注册命令
    const sayHello = vscode.commands.registerCommand('extension.sayHello', function () {
        vscode.window.showInformationMessage('VSCode-Tea-helper准备就绪!');
    });
    const newReactFunctionComp = vscode.commands.registerCommand('extension.newReactFunctionComp', async function (uri) {
        // const resp = await fs.mkdir(uri.path + '/Name');
        const inputText = await vscode.window.showInputBox({ // 这个对象中所有参数都是可选参数
            password:false, // 输入内容是否是密码
            ignoreFocusOut:true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
            placeHolder:'组件名称？', // 在输入框内的提示信息
            prompt:'输入组件名称（如：TeaInput）', // 在输入框下方的提示信息
            // validateInput:function(text){return text;} // 对输入内容进行验证并返回
        });
        const compPath = `${uri.path}/${inputText}`;
        const compFilePath = `${compPath}/${inputText}.tsx`;
        const compIndexFilePath = `${compPath}/index.tsx`;
        const compLessFilePath = `${compPath}/style.less`;
        try {
            vscode.window.setStatusBarMessage('处理中...');
            await fs.mkdirSync(compPath);
            await fs.writeFileSync(compFilePath, reactFunctionComponentTemp(inputText));
            await fs.writeFileSync(compIndexFilePath, reactComponentIndexTemp(inputText));
            await fs.writeFileSync(compLessFilePath, reactComponentLessTemp(inputText));
            vscode.window.setStatusBarMessage('');
        } catch (err) {
            vscode.window.showErrorMessage('创建文件失败，请检查您当前工作区的系统目录权限再试。');
        }
          
    });
    const newReactClassComp = vscode.commands.registerCommand('extension.newReactClassComp', function (uri) {
        vscode.window.showInformationMessage('word');
    });
    context.subscriptions.push(sayHello);
    context.subscriptions.push(newReactFunctionComp);
    context.subscriptions.push(newReactClassComp);
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function() {
    console.log('您的扩展“VSCode-Tea-helper”已被释放！')
};