# 腾讯云助手统一登录DEMO

## Quick Start

1. 打开开发工具，新建小程序项目，选择该工程下 `/basic` 目录作为项目目录，填入您小程序的 AppId，创建项目
2. 打开开发工具，打开右侧 `详情` ，将开发工具设置为下图所示
![](https://main.qcloudimg.com/raw/74ae75d8ff3ea4acb8204722b94a2705.png)
3. 点击预览，用微信扫描二维码，开始体验DEMO

## 生产环境注意事项

1. 该工程使用 ES6 语法，实际生产环境不确定小程序实际支持情况，建议酌情选择 Babel 编译或其他预编译语言来实现 ES6 -> ES5
2. 腾讯云登录态依赖Cookie，但是小程序不支持 Cookie，需要自行实现。DEMO中仅实现了最基本的 Cookie 能力，生产环境中请自行实现或等待后续助手提供的插件来实现
3. 心跳包，腾讯云登录态默认有效期 **1 小时** 左右，需要自行调用 VerifyLogin 接口来续期，登录态最长可以续到 **两天**。可以参考 DEMO 中的调用方式，但建议参数上带上 `_from` 参数，方便后续登录态出问题时定位问题
4. [小程序间跳转限制](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&announce_id=11541056526eufNY&version=&lang=zh_CN&token=)，必须要将 腾讯云助手的 `AppId:wxe2039b83454e49ed` 添加到您的 app.json 中，参见 DEMO 中的配置。

如有疑问，请咨询 vinsonxiao