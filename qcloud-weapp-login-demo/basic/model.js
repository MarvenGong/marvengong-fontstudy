const request = require('./libs/request');

module.exports = {
	checkLogin() {
		return request.post(`https://weapp.cloud.tencent.com/login/ajax/?action=verifyLogin&_from=weappLoginDemo`);
	},

	verifyLoginToken(token) {
		return request.post(`https://weapp.cloud.tencent.com/login/ajax/?action=verifyLoginToken&_from=weappLoginDemo`, { token });
	},

	getUserInfo() {
		return request.post(`https://weapp.cloud.tencent.com/services/ajax/?action=getUserInfo&_from=weappLoginDemo`);
	},
};