/**
 * 小程序实现cookie demo
 *
 * @author vinsonxiao
 */

const defaultOptions = {
	// 只接受这两个domain（严格匹配）
	domainList: ['qcloud.com', '.qcloud.com', '.cloud.tencent.com'],
	namespace: 'weapp.cookie',
};

let memoryStore = {};

/**
 * 简单的解析cookie字符串方法，max-age和expires统一为过期时刻时间戳（ms）
 * @param cookieString
 * @return {Object}
 */
function parseCookie(cookieString) {
	const cookie = {};

	const [keyValue, ...options] = cookieString.split(';');
	const [key, value] = keyValue.split('=');

	Object.assign(cookie, { key: key.trim(), value });

	options.forEach((option) => {
		const [optionKey, optionValue] = option.split('=');

		cookie[optionKey.toLowerCase().trim()] = decodeURIComponent(optionValue);
	});

	if (cookie['max-age']) {
		cookie.expires = Date.now() + (cookie['max-age'] * 60);
	} else if (cookie.expires) {
		cookie.expires = new Date(cookie.expires).getTime();
	}

	const result = {};

	['key', 'value', 'expires', 'domain'].forEach(key => {
		if (cookie[key]) {
			result[key] = cookie[key];
		}
	});

	return result;
}

function validateDomain(domain) {
	return defaultOptions.domainList.indexOf(domain) > -1;
}

function syncCookies({ addList = [], removeList = [] }) {
	addList.forEach((cookie) => {
		const { key, value, expires } = cookie;

		memoryStore[key] = { value, expires };
	});

	removeList.forEach(({ key }) => delete memoryStore[key]);
}

/**
 * 设置fake cookie，如无设置expires将永不过期
 */
function setCookie(cookies) {
	if (!Array.isArray(cookies)) {
		cookies = [cookies];
	}

	const addList = [];
	const removeList = [];

	cookies.forEach((cookie) => {
		if (typeof cookie === 'string') {
			cookie = parseCookie(cookie);
		}

		const { value, expires, domain } = cookie;

		if (!validateDomain(domain)) return;

		// 不设置的话，永不过期
		if (expires < Date.now() || !value) {
			removeList.push(cookie);
		} else {
			addList.push(cookie);
		}
	});

	syncCookies({ addList, removeList });
}

function removeCookie(...keys) {
	keys = keys.map(key => (typeof key === 'string' ? { key } : key));

	syncCookies({ removeList: keys });
}

/**
 * 批量查询对应cookie，过期的会被自动清理掉，不传参的话会将所有当前仍有效的cookie查出来
 * @param keys
 * @return {Object}
 */
function getCookies(...keys) {
	if (keys.length === 0) {
		keys = Object.keys(memoryStore);
	}

	const result = {};
	const expiredList = [];

	keys.forEach((key) => {
		const cookie = memoryStore[key];

		if (!cookie) return;

		// 过期的提出来，一会删掉（未设置expires的话永远不会进这个分支，即永不过期）
		if (cookie.expires < Date.now()) {
			expiredList.push(cookie);
		} else {
			result[key] = decodeURIComponent(cookie.value) || '';
		}
	});

	syncCookies({ removeList: expiredList });

	return result;
}

function getCookie(key) {
	const result = getCookies([key]);
	return result[key] || '';
}

function clearCookie(keepUinSkey = false) {
	if (!keepUinSkey) {
		memoryStore = {};
	} else {
		const { uin, skey, ownerUin, tinyid } = memoryStore;
		memoryStore = { uin, skey, ownerUin, tinyid };
	}
	console.log('clearCookie', memoryStore);
}

// 暴露的api
module.exports = {
	/**
	 * 批量处理响应头中的set-cookie头
	 * @param {Object} headers
	 */
	handleResponseHeaders(headers = {}) {
		const setCookies = [];

		for (const key in headers) {
			if (key.toLowerCase() === 'set-cookie') {
				const header = headers[key];

				// 兼容低版本基础库中响应的headers中每个字段内都是数组
				const _headerArr = Array.isArray(header) ? header : header.split(',');

				const headerArr = [];

				for (let i = 0, l = _headerArr.length; i < l; i++) {
					const _tmpArr = _headerArr[i].trim().split(';');

					if (_tmpArr[0] && _tmpArr[0].split('=').length > 1) {
						headerArr.push(_headerArr[i]);
					} else if (headerArr[headerArr.length - 1]) {
						headerArr[headerArr.length - 1] += `,${_headerArr[i]}`;
					}
				}

				headerArr.forEach(row => setCookies.push(row));
				break;
			}
		}

		setCookie(setCookies);
	},

	/**
	 * 获取所有有效的cookie，拼好字符串cookie返回
	 * @return {Object}
	 */
	handleRequestCookies() {
		const cookies = getCookies();

		const result = [];

		// 注意：这里一定要encode，否则如果cookie带有中文，设置进request的header里后会导致request api无响应
		for (let key in cookies) {
			result.push(`${key}=${encodeURIComponent(cookies[key])}`)
		}

		return {
			rawCookie: result.join('; '),
			cookies,
		};
	},
	getCookies,
	getCookie,
	removeCookie,
	setCookie(key, value, opts = {}) {
		if (Array.isArray(key)) {
			setCookie(key);
		} else {
			setCookie({ key, value, ...opts });
		}
	},
	clearCookie,

	getCookieOptions(opts = {}) {
		return Object.assign({ domain: '.cloud.tencent.com' }, opts);
	},
};