import Cookies from 'js-cookie';

const prefix = 'wau-ui';

export function setCookie (name, value, day, options = {}) {
  Cookies.set(prefix + name, value, Object.assign({ expires: day }, options));
}

export function getCookie (name) {
  return Cookies.get(prefix + name);
}

export function removeCookie (name, options = {}) {
  Cookies.remove(prefix + name, options);
}
