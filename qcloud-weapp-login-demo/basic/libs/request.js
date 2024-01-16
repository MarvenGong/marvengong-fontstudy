const cookie = require('./cookie');

function getCsrfCode(skey) {
	if (!skey) return '';

	let hash = 5381;

	for (let i = 0, len = skey.length; i < len; i += 1) {
		hash += (hash << 5) + skey.charCodeAt(i);
	}

	return hash & 0x7fffffff;
}

function request(url, data = {}, { respHandler, ...opts } = {}) {
	return new Promise((resolve, reject) => {
		const { rawCookie, cookies = {} } = cookie.handleRequestCookies();

		const { skey } = cookies;
		let { uin } = cookies;

		const header = { Cookie: rawCookie };

		if (!opts.method) {
			opts.method = 'GET';
		}

		if (url.indexOf('?') === -1) {
			url += '?';
		}

		const csrfCode = getCsrfCode(skey);

		if (csrfCode) {
			url += `&csrfCode=${csrfCode}&mc_gtk=${csrfCode}&g_tk=${csrfCode}`;
		}

		if (uin) {
			// `cookie.uin`移除前置多余的字符
			uin = String(uin).replace(/^o0*/, '');
			url += `&uin=${uin}`;
		}

		wx.request(Object.assign({
			url,
			data,
			header,
			success: async ({ data: resp, header: responseHeader = {} }) => {
				cookie.handleResponseHeaders(responseHeader);

				if (!resp) resp = {};

				if (typeof respHandler === 'function') {
					resp = respHandler(resp);
				}

				const { code, data: responseData } = resp;

				if (+code === 0) {
					resolve(responseData);
				} else {
					reject(responseData);
				}
			},
			fail: (error) => {
				return reject(error);
			},
		}, opts));
	});
}

exports = module.exports = request;
exports.post = (url, data = {}, opts = {}) => {
	return request(url, data, Object.assign({ method: 'POST' }, opts));
};
exports.get = (url, data = {}, opts = {}) => {
	return request(url, data, Object.assign({ method: 'GET' }, opts));
};