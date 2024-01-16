var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  const signStr='InstanceId=ctu-o9bsxitp&Nonce=10000&ScreenId=ab_djaljdl&SecretId=764c4bc6c34e701626be1b54be69d3e50da1692d9a96e710cdafc19e08852404&Timestamp=1622390400&UID=10000&Version=2021-06-01' // 计算的签名内容
  const secretKey = '6d0f1afa530213fb61ad397fcd175fe305ba6caa1bbf440c71646b2785f3b018'// 云图与综能工场协定的签名密钥
  const tes_signature = crypto.createHmac('sha256', secretKey).update(signStr).digest().toString('base64');
  console.log(tes_signature);
  res.render('index', { title: 'Express:' + tes_signature });
});

module.exports = router;
