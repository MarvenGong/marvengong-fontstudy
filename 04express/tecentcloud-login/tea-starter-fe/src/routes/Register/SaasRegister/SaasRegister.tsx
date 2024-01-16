import { Button, Form, Input, InputAdornment } from '@tencent/tea-component';
import React, { useState, useEffect } from 'react';
import { useSearchParam } from 'react-use';
import axios from 'axios';
import './style.less';
interface ISaasRegisterProps {
  name: string;
}
const SaasRegister = (props: ISaasRegisterProps) => {
  const { name } = props;
  const [data, setData] = useState<any>();
  const token = useSearchParam('token');
  const handleSend = () => {
    axios({
      url: '/openplatform/yunapi',
      method: 'post',
      baseURL: '/api',
      headers: {'Content-Type': 'application/json'},
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
      withCredentials: true,
    }).then((res) => {
      // 3. 从token中获取key作为sassToken，uin为用户的uin，ownerUin为用户的ownerUin。
    }).catch((err) => {})
  };
  return (
    <div className="saas-register-wraper">
      <Form.Title>注册腾讯云账号</Form.Title>
      <Form layout="vertical" hideLabel={false}>
        <Form.Item label="手机号">
          <InputAdornment after={
            <Button onClick={() => handleSend()} htmlType="button" type="primary">
              发送
            </Button>
          }>
            <Input />
          </InputAdornment>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SaasRegister;
