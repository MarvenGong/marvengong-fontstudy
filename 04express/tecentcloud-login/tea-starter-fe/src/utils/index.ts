/* eslint-disable no-var */
/* eslint-disable no-restricted-syntax */
/**
 * 复制或者合并对象
 * @param deep 是否深度拷贝
 * @param target 合并后的对象
 * @param options 要合并的对象
 * @returns {*}
 */
const deepCopy = function(deep: boolean, target, options) {
  let copyIsArray;
  // eslint-disable-next-line prefer-destructuring
  const toString = Object.prototype.toString;
  const hasOwn = Object.prototype.hasOwnProperty;

  const class2type = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Object]': 'object',
  };

  const type = function(obj) {
    return obj === null
      ? String(obj)
      : class2type[toString.call(obj)] || 'object';
  };

  const isWindow = function(obj) {
    return obj && typeof obj === 'object' && 'setInterval' in obj;
  };

  const isArray =
    Array.isArray ||
    function(obj) {
      return type(obj) === 'array';
    };

  const isPlainObject = function(obj) {
    if (!obj || type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
      return false;
    }

    if (
      obj.constructor &&
      !hasOwn.call(obj, 'constructor') &&
      !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
    ) {
      return false;
    }

    let key;
    for (key in obj) {
    }

    return key === undefined || hasOwn.call(obj, key);
  };
  for (const name in options) {
    const src = target[name];
    const copy = options[name];

    if (target === copy) {
      continue;
    }

    if (
      deep &&
      copy &&
      (isPlainObject(copy) || (copyIsArray = isArray(copy)))
    ) {
      if (copyIsArray) {
        copyIsArray = false;
        var clone = src && isArray(src) ? src : [];
      } else {
        var clone = src && isPlainObject(src) ? src : {};
      }

      target[name] = deepCopy(deep, clone, copy);
    } else if (copy !== undefined) {
      target[name] = copy;
    }
  }

  return target;
};
export {
  deepCopy
};
