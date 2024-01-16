<template>
	<view class="content" @click="handleShowMsg({a: 1, b: 2})">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			wx.request({
				url: 'https://www.fastmock.site/mock/2c8839b182b4d4f0658dcb8a528013d5/tes/app/products',
				method: 'GET',
				success(res) {
					console.log(res);
				},
				fail(err) {
					console.error(err);
				}
			})
		},
		methods: {
			handleShowMsg(opt) {
				uni.showToast({
					title: '您好' + opt.a + opt.b
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
