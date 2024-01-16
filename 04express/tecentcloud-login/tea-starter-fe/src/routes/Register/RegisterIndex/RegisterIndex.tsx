import React, { useState, useEffect } from 'react';
import { QQ, Wechat } from '@tencent/qcloud-account-lib';
import './style.less';
import { Icon } from '@tencent/tea-component';
import CloudLoginConfig from '@src/configs/CloudLoginConfig';
interface IRegisterProps {
  name?: string;
}
const RegisterIndex = (props: IRegisterProps) => {
  const [wxUrl, setwxUrl] = useState('');
  const baseurl = CloudLoginConfig.baseurl;
  console.log(baseurl);
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
  // 二维码url，需要用iframe内嵌
  
  // 获取微信MFA url
  // wechat.getMfaUrl({
  //   tmpcode, // 校验code，后台返回
  //   nickname, // 绑定的微信昵称，h5端需要显示
  //   hasOpenId, // 是否绑定openId，后台返回
  //   ownerUin // 当前校验的ownerUin，注意：登录保护传身份列表中选中的账号对应的ownerUin，操作保护不需要传此参数，
  // });
  // 停止轮询
  // wechat.destroy();
  const qq = new QQ({
    redirectUrl: baseurl + '/cloud/login/callback?type=qq&action=reg', // 回调拿授权码url
    callback: (authInfo = { authCode, state })=> {
      console.log('收到授权信息', authInfo);
    }, // 授权码回调
    // cookieDomain: '.cloud.tencent.com',  // 非必选，如果是在腾讯云控制台使用需要传
  })
  const handleRegisterByQQ = () => {
    qq.openToAuth(qq.getAuthUrl()); 
  }
  useEffect(() => {
    const wxUrl = wechat.getAuthUrl();
    setwxUrl(wxUrl);
  }, [])
  return (
    <div className="register-index-wraper">
      <div className="container">
        <div>
          <iframe onLoad={(e) => {console.error(location.href)}} width="180" height="180" src={wxUrl}></iframe>
        </div>
        <div style={{marginTop: '20px'}}>
          <span>其他注册方式</span>
          <span onClick={handleRegisterByQQ}>
            <Icon type="qq" /> QQ
          </span>
        </div>
      </div>
    </div>
  );
};
export default RegisterIndex;
