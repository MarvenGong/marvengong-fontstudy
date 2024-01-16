var express = require('express');
var router = express.Router();
const axios = require('axios');
const ETools = require('etools');
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const smsClient = tencentcloud.sms.v20190711.Client
const config = {
  secretId: "AKID0SxNrPp37zbx7CGC7qY3KNCm7C7oKh1E",
  secretKey: "8rleUHvQikdcZNyMWdeU8Yq6AzYrvjN9",
}
/* 实例化要请求产品(以sms为例)的client对象 */
const client = new smsClient({
  credential: {
  /* 必填：腾讯云账户密钥对secretId，secretKey。
   * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
   * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
   * 以免泄露密钥对危及你的财产安全。
   * CAM密匙查询: https://console.cloud.tencent.com/cam/capi */
    secretId: 'AKIDGI4bWADdWAZjcLs2yAwTiXAXgYFSu8ZP',
    secretKey: 'VcS1IL7dwYw3tMUNYVFl22qvlKuGOIwM',
  },
  /* 必填：地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
  region: "ap-guangzhou",
  /* 非必填:
   * 客户端配置对象，可以指定超时时间等配置 */
  profile: {
    /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
    signMethod: "HmacSHA256",
    httpProfile: {
      /* SDK默认使用POST方法。
       * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
      reqMethod: "POST",
      /* SDK有默认的超时时间，非必要请不要进行调整
       * 如有需要请在代码中查阅以获取最新的默认值 */
      reqTimeout: 300,
      /**
       * SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
       * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com
       */
      endpoint: "sms.tencentcloudapi.com"
    },
  },
})

/* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
 * 属性可能是基本类型，也可能引用了另一个数据结构
 * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */
const params = {
  /* 短信应用ID: 短信SdkAppid在 [短信控制台] 添加应用后生成的实际SdkAppid，示例如1400006666 */
  SmsSdkAppid: "1400408536",
  /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
  Sign: "腾讯云综能工场",
  /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
  //ExtendCode: "",
  /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
  //SenderId: "",
  /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
  //SessionContext: "",
  /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
   * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
  PhoneNumberSet: ["+8615696544221"],
  /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
  TemplateID: "762683",
  /* 模板参数: 若无模板参数，则设置为空*/
  TemplateParamSet: ["666", 300],
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/openplatform/yunapi', function(req, res) {
  const timestamp = Date.now();
  const dateStr = ETools.datetime.format(new Date(timestamp), 'YYYY-MM-DD');
  try {
    client.SendSms(params, function (err, response) {
      // 请求异常返回，打印异常信息
      if (err) {
        res.send(err)
      }
      // 请求正常返回，打印response对象
      res.send(response)
    })
  } catch (error) {
    res.send(error)
  }
  
  // client.DescribeImportImageOs(params).then(
  //   (data) => {
  //     console.log(data);
  //     axios({
  //       url: '',
  //       method: 'post',
  //       baseURL: 'https://account.tencentcloudapi.com',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'TC3-HMAC-SHA256'
  //         + ' Credential=AKID0SxNrPp37zbx7CGC7qY3KNCm7C7oKh1E/'+dateStr+'/creativecloud-pro/tc3_request,'
  //         + ' SignedHeaders=content-type;host,'
  //         + ' Signature=9d73a2abd1d6e894ed232038d24d66fa301c33c88c96a11e858091f9bd5f3e02',
  //         // Host: 'cvm.tencentcloudapi.com',
  //         'X-TC-Action': 'SendSmsVerifyCode',
  //         'X-TC-Version': '2018-12-25',
  //         'X-TC-Timestamp': timestamp,
  //         'X-TC-Region': 'ap-chongqing',
  //       },
  //       data: {
  //         // "clientIP": "139.199.174.11",
  //         Action: 'SendSmsVerifyCode',
  //         Version: '2018-12-25',
  //         "CountryCode": "86",
  //         "PhoneNumber": "15696544221",
  //         "ClientIp": "1.1.1.1",
  //         "Lang": "zh",
  //         // "ticket": "t021-inm0iyKIpklN_EQha9t0LZSzb-CZxwUD9ZIY7HoTF7-JpDvq-YIeRy_kF6DSnNKHlplRY1eMuML6hBgq377HU1fvT0-ew60uUuDAn09P6rog2R7Rnxyg**",
  //         // "captchaAppId": "2006043797",
  //         // "random": "*@ac"
  //       },
  //     }).then((res) => {
  //       console.log(res);
  //       res.json({
  //         code: res.data
  //       });
  //     }).catch((err) => {
  //       res.json({
  //         code: err
  //       });
  //     })
  //   },
  //   (err) => {
  //     console.error("error", err);
  //   }
  // );
  
});
router.get('/verify-code', function(req, response, next) {
  const { code, userAgent } = req.body;
  axios({
    url: '',
    method: 'post',
    baseURL: 'https://sms.tencentcloudapi.com',
    headers: {
      
    },
    data: {
      // "clientIP": "139.199.174.11",
      Action: 'SendSmsVerifyCode',
      Version: '2018-12-25',
      "CountryCode": "86",
      "PhoneNumber": "15696544221",
      "ClientIp": "1.1.1.1",
      "Lang": "zh",
      // "ticket": "t021-inm0iyKIpklN_EQha9t0LZSzb-CZxwUD9ZIY7HoTF7-JpDvq-YIeRy_kF6DSnNKHlplRY1eMuML6hBgq377HU1fvT0-ew60uUuDAn09P6rog2R7Rnxyg**",
      // "captchaAppId": "2006043797",
      // "random": "*@ac"
    },
  }).then((res) => {
    console.log(res);
    response.send({
      code: res.data
    });
  }).catch((err) => {
    response.send({
      code: err
    });
  });
});
module.exports = router;
