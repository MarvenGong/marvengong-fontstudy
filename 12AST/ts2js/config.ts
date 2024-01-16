// 综能和碳环境的识别参数，false加载综能菜单和路由，true加载碳菜单和路由
export const IS_CARBON = false;

// 门户接口
export const API_URL = '/api';

// 微信配置
export const WX_CONFIG = {
  APPID: 'wxa3067dff3a672225',
  LOGIN_URL: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
};
// 微信鉴权配置(综能预发现网，碳门户预发现网，一共4种 各环境不要直接覆盖)
export const WX_AUTH_CONFIG = {
  APPID: 'wx927e9d96cdc1c02e',
};

// 防水墙开关
export const captchaAuthConfig = {
  switch: true,
};
// 防水码，预发布和现网使用不同的信息
export const VERIFY_CODE_APPID = '2010686124';

// cos桶配置
export const COS_CONFIG = {
  BUCKET: 'tes-public-1302008357', // public
  BUCKET_PRIVATE: 'tes-op-1302008357', // private
  REGION: 'ap-guangzhou',
};
// 上传文件时文件路径 开发环境为 '' 预发环境为 'pre-ds' 现网环境为 'ds'
export const COS_URL_RESOURCE = '';

// cdn地址
export const CDN_URL = 'https://tes-public-1302008357.cos.ap-guangzhou.myqcloud.com/';
// cdn私有桶配置
export const CDN_PRIVATE_URL = 'https://tes-op-1302008357.cos.ap-guangzhou.myqcloud.com/';

// Tam上报id
export const TAM_UP_ID = 'LLNOGmPSAEHZGuWJJI';

// yuntu env
export const YUNTU_ENV = 'dev';

// 数据资产限制条数
export const DATA_LIMIT_NUMBER = 300;

// 体验教学配置
export const TUTOR_CONFIG = { disabled: false };

// 立即咨询配置
export const CONSULT_IMMEDIATELY = { disabled: false };

// 腾讯云登录配置
export const TENCENT_CLOUD_LOGIN = { disabled: false };

// 在线客服配置
export const ONLINE_SERVICE_CONFIG = {
  disabled: false,
  domId: 'qidian_wpa_3009025409_374',
  id: 'qd300902540965afaf0bd2474fe671114a932da0300e',
  src: 'https://wp.qiye.qq.com/qidian/3009025409/65afaf0bd2474fe671114a932da0300e',
};

// 特殊演示定制文案
export const CUSTOMIZED_SHOW = {
  energy_application_txt: '能源应用',
};

// logo资源重定向目录
export const CUSTOMIZATION_REDIRECT = { qianfan: 'qianfan' };


export const CDN_HELP_CENTER = `${CDN_URL}helpcenter/doc/`;
// 公共自定义模块图片地址
export const CUSTOM_CDN_URL = `${CDN_URL}static/customization/`;
// 首页图片地址
export const BaseHomeUrl = `${CDN_URL}static/sites/images/newhome/`;
// svg类图片地址
export const SVG_CDN_URL = `${CDN_URL}static/sites/svg/`;
// icon类图片地址
export const ICON_CDN_URL = `${CDN_URL}static/sites/icon/`;
// 组合包模块图片地址
export const COMBO_CDN_URL = `${CDN_URL}static/sites/images/combo/`;
// 产品模块图片地址
export const PRODUCT_CDN_URL = `${CDN_URL}static/sites/images/product/`;
// 体验式教学模块图片地址
export const TUTOR_CDN_URL = `${CDN_URL}static/sites/images/tutor/`;

// 加密公钥
export const publickKey = '-----BEGIN rsa public key-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1xbo3kLi7ujcKeXotr1cuM1IBDFfpURBjKsi8WqhY165Fz2Jt2JjQzfA9he+/5e1rnhenUkB3uhFqey+sdlLkyEeRq+AJCmbt9SvDa4EtjdrX+KB0c/S+jq3kWyDrUtizIF8OHAEoH9585LByCCWIF/aDDCJB9O1CyJXLJXz9h6Q4nibNHtqODN6yrt2563Qqzkg0UVXql4g6I7iZK+jm2js2t1aaSjkNg3qYWmhkgbtdSA+Tt0I47uZxcPTt3qVAWvKSG0jXFrNbovcSNlFf/VABwuvB4tXrDj1DCxCjq1pu4oBywOXH8svSTMNsp8vNqR7GxuX85mss5AZZQcwyE7GSAvd6krWvIc1sUuF2atGeT/GvclbWn+UEzUOxpjrdGw1hGxerfiqSf5MndRcMF2uDdxXdh94IjkBmnCMyzneZhAwm3KoCtfETTN+MWFRIh1WKtevgGZBic6+2THNu8inX06UhLtfLJQUY0euy8qwx3rnXKktoyXcbMdt+wrJripsHxufy4jwciYqoBCKWcIV9SNLglKBZP3i2xNJ2TDTAkQzI4n8Z6DWG2z8DohuQXL2bplJzeYo9Bcr5yR1cv/sxxJRh8ebkBROke9eplKcN/YHLgNy+512VldJklIz0uBoYgO4UAacRIbUFwRG44bJEBPvxl6j/NDXe0p4lGUCAwEAAQ==-----END rsa public key-----';

// 来源
export const ORIGIN_TARGET = 'tes';

// 腾讯地图key
export const TMAP_KEY = 'VCIBZ-ODDCW-BZURY-RH5ZZ-FI4BT-6NBR5';

export const isSentry = true;
