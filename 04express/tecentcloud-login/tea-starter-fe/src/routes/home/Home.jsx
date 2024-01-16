// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Layout, ExternalLink, Card, Icon } from "@tencent/tea-component";
const { Body, Content } = Layout;
import { QQ, Wechat } from "@tencent/qcloud-account-lib";
import CloudLoginConfig from '@src/configs/CloudLoginConfig';
import axios from 'axios';
export function Home(props) {
  const [wxUrl, setwxUrl] = useState('');
  const baseurl = CloudLoginConfig.baseurl;
  const { history } = props;
  const wechat = new Wechat({
    imgSize: 188|160, // 二维码大小
    redirectUrl: baseurl + '/cloud/login/callback?type=wx&action=reg', // 回调拿授权码url
    // callback: (authInfo)=> {}, // 授权码回调
    // cookieDomain: '.cloud.tencent.com',  // 非必选，如果是在腾讯云控制台使用需要传
  })
  // callback回调和 recieveAuthCode 事件侦听二选一
  wechat.on('recieveAuthCode', function(authInfo) {
    console.log(authInfo);
  })
  const qq = new QQ({
    redirectUrl: 'https://test.creativecloud.tencent.com/cloud/login/callback', // 回调拿授权码url
    callback: (authInfo = { authCode, state })=> {
      console.log('收到授权信息', authInfo);
    }, // 授权码回调
    // cookieDomain: '.cloud.tencent.com',  // 非必选，如果是在腾讯云控制台使用需要传
  })
  const sUrl = encodeURIComponent('https://cloud.tencent.com/product/cvm');
  const loginCallback = (data) => {
    const { token, accountList } = data;
    if (token.uin === 0 || accountList.length === 0) {
      console.log('===========', data);
      history.push(`/register/saas?token=${token.key}`);
    } else {
      console.log('=======XXXXXXX');
      const { token } = res.data.data;
      console.log(res.data.data);
      // 4. 带登录态跳转腾讯云登录，
      const query = `SaaSToken=${token.key}&platform=${CloudLoginConfig.platform}&clientUA=${navigator.userAgent}&uin=${token.uin}&ownerUin=${token.ownerUin}&s_url=${sUrl}`;
      location.href = `https://cloud.tencent.com/login/saas/jumplogin?${query}`;
    }
  };
  const handleGoTencent = (oauthInfo) => {
    const { code, qid, type: loginType } = oauthInfo;
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
          "loginType": loginType,
          "loginTo": "https:\/\/console.cloud.tencent.com",
          "platform": CloudLoginConfig.platform,
          "clientType": "pcweb",
          "trafficParams": ""
        },
        "type": loginType,
        "action": "verify",
        "data": {
          "code": code,
          "state": qid,
          type: 1,
          "redirect_uri": "https:\/\/cloud.tencent.com\/login\/qqAccessCallback"
        }
      },
      withCredentials: true,
    }).then((res) => {
      // 3. 从token中获取key作为sassToken，uin为用户的uin，ownerUin为用户的ownerUin。
      loginCallback(res.data.data);
    }).catch((err) => {
      alert('校验失败--' + err);
    })
    // location.href = "https://cloud.tencent.com/login/saas/jumplogin?" + query;
  };
  const verifyWxCode = (oauthInfo) => {
    const { code, qid, type: loginType } = oauthInfo;
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
          "loginType": "wx",
          "loginTo": "https:\/\/cloud.tencent.com\/open\/authorize?scope=login&app_id=100005645770&redirect_url=http%3A%2F%2Fsandbox.cloud.tencent.com%2Fsandbox%2Flogin%2Fcallback",
          "platform": CloudLoginConfig.platform,
          "clientType": "pcweb",
          // "trafficParams": "gclid=EAIaIQobChMI9dyIpomd3wIVTjEqCh0nTQGVEAEYASAAEgKbyfD_BwE;"
        },
        "type": loginType,
        "action": "verify",
        "data": {
          "code": code,
          "type": 1,
          "action": "verify"
        }
      },
      withCredentials: true,
    }).then((res) => {
      loginCallback(res.data.data);
    }).catch((err) => {
      alert('校验失败--' + err);
    })
  }
  let getOauthInfoTimer = null;
  const clearGetOauthInfoTimer = () => {
    if (getOauthInfoTimer) {
      clearInterval(getOauthInfoTimer);
      getOauthInfoTimer = null;
    }
  }
  const handleQQLogin = () => {
    qq.openToAuth(qq.getAuthUrl());
    getOauthInfoTimer = setInterval(() => {
      const oauthInfo = localStorage.getItem('oauthInfo');
      if (oauthInfo) {
        clearGetOauthInfoTimer();
        // alert(oauthInfo);
        handleGoTencent(JSON.parse(oauthInfo));
      }
    }, )
  }
  useEffect(() => {
    localStorage.removeItem('oauthInfo');
    const wxUrl = wechat.getAuthUrl();
    setwxUrl(wxUrl);
    window.addEventListener('message', (e) => {
      if (e.data.type === 'oauthSuccess') {
        console.log(e.data);
        verifyWxCode(e.data.data);
      }
    })
  }, [])
  return (
    <Body>
      <Content>
        <Content.Header
          title="Home"
          operation={<ExternalLink weak>Home</ExternalLink>}
        ></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              {/* <Button onClick={handleLogin} htmlType="button" type="primary">
                  前往登录
              </Button> */}
              <div>
                <iframe onLoad={(e) => {console.error(location.href)}} width="180" height="180" src={wxUrl}></iframe>
              </div>
              <div style={{marginTop: '20px'}}>
                <span>其他注册方式</span>
                <span onClick={handleQQLogin}>
                  <Icon type="qq" /> QQ
                </span>
              </div>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
}
