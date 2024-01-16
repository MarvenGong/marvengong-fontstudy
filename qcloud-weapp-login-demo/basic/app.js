const model = require('./model');
const cookie = require('./libs/cookie');

const heatBeatGap = 5 * 60 * 1000;

App({
	onShow(options) {
		this.handleAppOnShowOptions(options);
		this.heatBeatTimer = setInterval(() => this.sendHeatBeatPackets(), heatBeatGap);

		if (this.lastHideTime && Date.now() - this.lastHideTime > heatBeatGap) {
			this.sendHeatBeatPackets();
		}
	},

	onHide() {
		this.lastHideTime = Date.now();
		clearInterval(this.heatBeatTimer);
	},

	/**
	 * 发送心跳包，如果当前有登录态，每次调用verify都会延长skey有效期时间，如果当前无登录，不做操作
	 * @return {Promise.<void>}
	 */
	sendHeatBeatPackets() {
		return model.checkLogin();
	},

	async handleAppOnShowOptions(options = {}) {
		try {
			if (!options) {
				options = {};
			}

			let { referrerInfo, scene } = options;

			if (!referrerInfo) referrerInfo = {};

			this.lastScene = scene;
			this.lastReferrerInfo = referrerInfo;

			if (referrerInfo && referrerInfo.extraData && referrerInfo.extraData.token) {
				wx.setClipboardData({
					data: referrerInfo.extraData.token
				});
			}

			console.log({ referrerInfo })

		} catch (err) {
			console.error(err);
		}
	},

	logout() {
		cookie.clearCookie();
	},

	goLogin() {
		wx.navigateToMiniProgram({
			appId: 'wxe2039b83454e49ed',
      path: 'pages/login/login-from-outside/login-from-outside',
      envVersion: 'release'
		});
	}
});