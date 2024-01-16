// 判断字符串是否是手机号
export const isPhone = (phone: string): boolean => {
  return /^1[3456789]\d{9}$/.test(phone);
};
// 判断字符串是否是邮箱地址
export const isEmail = (email: string): boolean => {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email);
};
// 判断字符串是否是网站地址
export const isUrl = (url: string): boolean => {
  return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(url);
};
// 判断字符串是否是身份证号
export const isIdCard = (idCard: string): boolean => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
};
// 导出上面所有函数
export default {
  isPhone,
  isEmail,
  isUrl,
  isIdCard,
};

