const model = require('../model');

// pages/index.js
Page({
	data: {
		hasInit: true,
		hasLogin: true,
		username: '',
		uin: '',
	},

	async onShow() {
		const viewData = {};

		try {
      console.log(getApp());
			const { lastScene, lastReferrerInfo } = getApp();

			let hasLogin = false;

			if (+lastScene === 1038 && lastReferrerInfo && lastReferrerInfo.extraData && lastReferrerInfo.extraData.token) {
				await this.doLoginByToken(lastReferrerInfo.extraData.token);
				hasLogin = true;
			} else {
				const resp = await model.checkLogin();

				hasLogin = resp.hasLogin;
			}

			viewData.hasLogin = hasLogin;

			if (hasLogin) {
				wx.showToast({
					title: '登录成功',
				});

				const { nick: username, uin } = await model.getUserInfo();

				Object.assign(viewData, { username, uin });
			}
		} catch (err) {
			viewData.hasLogin = false;
		} finally {
			viewData.hasInit = true;
			this.setData(viewData);
		}
	},

	doLogout() {
		getApp().logout();
		this.setData({
			hasLogin: false,
		});
		wx.showToast({
			title: '注销成功',
		});
	},

	doLoginByToken(token) {
		return model.verifyLoginToken(token)
	},

	onTapHeader() {
		const app = getApp();

		if (this.data.hasLogin) {
			const itemList = ['注销', '切换身份'];

			wx.showActionSheet({
				itemList,
				success: ({ tapIndex }) => {
					switch (itemList[tapIndex]) {
						case '注销':
							this.doLogout();
							break;
						case '切换身份':
							app.goLogin();
							break;
					}
				},
			})
		} else {
			app.goLogin();
		}
	},
});
