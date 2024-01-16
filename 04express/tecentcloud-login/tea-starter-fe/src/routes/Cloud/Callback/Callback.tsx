// @ts-nocheck
import React, { useEffect } from 'react';
import { useSearchParam } from 'react-use';
import { Button } from "@tencent/tea-component";
import axios from 'axios';
import CloudLoginConfig from '@src/configs/CloudLoginConfig';
import './style.less';
type actionType = 'login' | 'reg';
type typeType = 'wx' | 'qq';
const Callback = (props: any) => {
  // 1. 在callback页面，获取url参数code和qid。
  const code = useSearchParam('code');
  const qid = useSearchParam('qid');
  const action: actionType = useSearchParam('action') || 'login';
  const type: typeType = useSearchParam('type') || 'qq';
   
  const sUrl = encodeURIComponent('https://cloud.tencent.com/product/cvm');
  useEffect(() => {

  }, []);
  const handleGoTencent = () => {
    // 2. 调用登录接口换取token信息，
    axios({
      url: '/login/saas/prelogin',
      method: 'post',
      baseURL: 'https://cloud.tencent.com',
      headers: {'Content-Type': 'application/json'},
      data: {
        // "clientIP": "139.199.174.11",
        "clientUA": navigator.userAgent,
        "platform": CloudLoginConfig.platform,
        "reportLoginInfo": true,
        "detail": {
          "loginType": "qq",
          "loginTo": "https:\/\/console.cloud.tencent.com",
          "platform": CloudLoginConfig.platform,
          "clientType": "pcweb",
          "trafficParams": ""
        },
        "type": "qq",
        "action": "verify",
        "data": {
          "code": code,
          "state": qid,
          "redirect_uri": "https:\/\/cloud.tencent.com\/login\/qqAccessCallback"
        }
      },
      withCredentials: true,
    }).then((res) => {
      // 3. 从token中获取key作为sassToken，uin为用户的uin，ownerUin为用户的ownerUin。
      const { token } = res.data.data;
      console.log(res.data.data);
      // 4. 带登录态跳转腾讯云登录，
      const query = `SaaSToken=${token.key}&platform=${CloudLoginConfig.platform}&clientUA=${navigator.userAgent}&uin=${token.uin}&ownerUin=${token.ownerUin}&s_url=${sUrl}`;
      location.href = `https://cloud.tencent.com/login/saas/jumplogin?${query}`;
    }).catch((err) => {
      alert('校验失败--' + err);
    })
    // location.href = "https://cloud.tencent.com/login/saas/jumplogin?" + query;
  };
  const handleGoCloudGraph = () => {
    location.href = `https://cloud.tencent.com/login/saas/jumplogin?${query}&s_url=${cloudGraphHome}`;
  }
  useEffect(() => {
    // 因为qq是跳转的新页面，所以需要关闭当前页面并存储code信息
    const result = {
      code,
      qid,
      type,
      action
    }
    if (type === 'qq') {
      localStorage.setItem('oauthInfo', JSON.stringify(result));
      setTimeout(() => {
        window.close();
      }, 500)
    } else if (type === 'wx') {
      window.parent.postMessage({
        type: 'oauthSuccess',
        data: result
      }, '*')
    }
  }, []);
  return (
    <div className="callback-wraper">
      {code && (
        <div className="container">
          <span>登录成功</span>
          <p>
            <Button onClick={handleGoTencent} htmlType="button" type="primary">
              前往腾讯云
            </Button>
          </p>
          {/* <p>
            <Button onClick={handleGoCloudGraph} htmlType="button" type="primary">
              前往云图
            </Button>
          </p> */}
        </div>
      )}
    </div>
  );
};
export default Callback;
