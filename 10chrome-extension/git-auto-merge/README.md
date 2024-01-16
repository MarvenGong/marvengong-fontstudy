1、调用chrome api 只能在 popup page 或者 background page 可以通过 通信的方式，content_script 通知 background page
执行想要的操作

2、开发插件选项页时由于引用了vue框架开发前端页面，导致拒绝eval求值问题
Uncaught EvalError: Refused to evaluate a string as JavaScript because ‘unsafe-eval’ is not an allowed source of script in the following Content Security Policy directive: “script-src ‘self’ blob: filesystem:”.

这是浏览器自带的"网页安全政策"（Content Security Policy）导致的；浏览器默认的Content-Security-Policy的安全政策时“ default-src ‘self’ ”。我们可以通过manifest.json重新配置Content Security Policy的配置开启eval功能;

~~~json
// 代码如下，可直接复制
"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
~~~