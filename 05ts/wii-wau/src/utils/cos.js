import CosCloud from 'cos-js-sdk-v5'
import SparkMD5 from 'spark-md5'

class RocketCos {
  constructor({ appId, bucket, region, folder, authUrl }) {
    this.appId = appId
    this.bucket = bucket
    this.region = region
    this.folder = folder
    this.initCos(authUrl)
  }

  initCos(url) {
    this.cos = new CosCloud({
      FileParallelLimit: 5,
      ChunkParallelLimit: 5,
      ChunkMbSize: 8 * 1024 * 1024,
      getAuthorization(options, callback) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function(e) {
          let response = null
          try {
            response = JSON.parse(e.target.responseText)
          } catch (e) {}
          const { ret, data } = response
          if (ret === 0) {
            callback.call(this, {
              TmpSecretId: data.credentials && data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
              XCosSecurityToken:
                data.credentials && data.credentials.sessionToken,
              ExpiredTime: data.expiredTime
            })
          }
        }
        xhr.send()
      }
    })
  }

  upload({ file, fileName, onProgress, onSuccess, onError }) {
    const that = this
    const callback = onSuccess
    const md5Name = SparkMD5.hash(fileName)
    that.cos.sliceUploadFile(
      {
        Bucket: `${that.bucket}-${that.appId}`,
        Region: that.region,
        Key: `${that.folder}/${md5Name}`,
        Body: file,
        onTaskReady(taskId) {
          console.log(taskId)
        },
        onHashProgress(progressData) {
          // console.log('onHashProgress', progressData)
        },
        onProgress(progressData) {
          onProgress({ isTrusted: true, percent: progressData.percent * 100 })
        }
      },
      function(err, data) {
        if (err) {
          console.error(err)
        } else {
          console.log(
            `https://${that.bucket}-${that.appId}.cos.${that.region}.myqcloud.com/${that.folder}/${md5Name}`
          )
          callback.call(this, {
            data: {
              name: fileName,
              resource_path: `/${that.appId}/${that.bucket}/${that.folder}/${md5Name}`,
              url: `https://${that.bucket}-${that.appId}.cos.${that.region}.myqcloud.com/${that.folder}/${md5Name}`
            }
          })
        }
      }
    )
  }
}

export default RocketCos
