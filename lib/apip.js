'use strict'
// 编码库
var cryptoJsCore = require('crypto-js/core')
require('crypto-js/md5')
require('crypto-js/sha1')
var util = require('../util')
var api = require('./api.js')
var getSign = require('./getSign.js')
var sendUploadPart = require('./sendUploadPart.js')
var eventNames = 'beforeSign completeSign progress progressSign progressUpload error complete'.split(' ')
module.exports = {
  constructor: function (optionts) {
    // 初始化事件
    this.optiontsInit(optionts)
    return this.runInit()
  },
  optiontsInit: function (optionts) {
    var key, value, tkey
    for (key in optionts) {
      value = optionts[key]
      tkey = key.substr(2, 1).toLowerCase() + key.substr(3)
      if (!key) continue
      if (eventNames.indexOf(key) > -1) {
        if (util.isFunction(value)) {
          this['on' + key.substr(0, 1).toUpperCase() + key.substr(1)] = value
        }
      } else if (eventNames.indexOf(tkey) > -1) {
        if (util.isFunction(value)) {
          this[key] = value
        }
      } else {
        this[key] = optionts[key]
      }
    }
    key = value = tkey = optionts = void 0
  },
  runInit: function () {
    var self = this
    var _promise = new Promise(function (resolve, reject) {
      self.useUnderline = self.useUnderline === void 0 ? false : self.useUnderline
      // 默认没有中断
      self._isAbort = false
      // 文件信息
      self._fileInfo = {}
      // 获取文件大小
      self._fileInfo.fileSize = self.file.size
      // 获取文件类型
      self._fileInfo.fileType = self.file.type
      // 运行程序
      self.run().then(resolve, reject)
      // 回收
      resolve = reject = void 0
    })
    // 上传进度触发
    .then(function () {
      return this.onProgressUploadEmit()
    })
    // 完成 - 在成功的时候的参数传回去
    .then(function uploadResolveRun () {
      var fileInfo = util.clone(this._fileInfo)
      return this.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo
    })
    setTimeout(function () {
      // 回收
      _promise = void 0
    }, 0)
    // 错误事件
    if (this.onError && util.isFunction(this.onError)) {
      _promise.catch(this.onError)
      delete this.onError
    }
    // 完成事件
    if (this.onComplete && util.isFunction(this.onComplete)) {
      _promise.then(this.onComplete)
      delete this.onComplete
    }
    // 返回一个 Promise
    return _promise
  },
  run: function () {
    var self = this
    new Promise(function (resolve, reject) {
      // 设备类型
      self._fileInfo.deviceType = self.deviceType || 'html5'
      if (util.isFunction(api.api)) {
        resolve()
      } else {
        reject(util.setErrorId('NOT_SET_API_METHOD', new Error('Please set the Api request method')))
      }
    })
    // 获取分开大小
    .then(function getPartSizeRun () {
      var fileInfo = util.clone(self._fileInfo)
      var _promise = self.getPartSize(self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo)
      if (_promise instanceof Promise) {
        return _promise
      } else {
        return Promise.reject(util.setErrorId('GET_PART_SIZE_RETURN_PROMISE', new Error('optionts.getPartSize does not return Promise')))
      }
    })
    .then(function checkPartSize (partSize) {
      if (!partSize.part_size) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_SIZE_ERROR', new Error('server return part_size error')))
      }
      if (!partSize.part_sum) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_SUM_ERROR', new Error('server return part_sum error')))
      }

      self._fileInfo.partSize = partSize.partSize || partSize.part_size
      self._fileInfo.partSum = partSize.partSum || partSize.part_sum
    })
    .then(function getFileSignRun () {
      return getSign({
        file: self.file,
        onBefore: function (res) {
          return Promise.resolve()
          .then(function onBeforeSignEmit () {
            if (util.isFunction(self.onBeforeSign)) {
              return self.onBeforeSign(self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res))
            }
          })
          .then(function returnRes () {
            return res
          })
        },
        onComplete: function (res) {
          return Promise.resolve()
          .then(function onCompleteSignEmit () {
            if (util.isFunction(self.onCompleteSign)) {
              return self.onCompleteSign(self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res))
            }
          })
          .then(function returnRes () {
            return res
          })
        },
        switch: ['md5', 'sha1', 'crc32', 'partmd5'],
        onProgress: function (res) {
          return Promise.resolve()
          .then(function onProgressSignEmit () {
            if (util.isFunction(self.onProgressSign)) {
              return self.onProgressSign(self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res))
            }
          })
          .then(function onProgressEmit () {
            if (util.isFunction(self.onProgress)) {
              var t = util.clone(res)
              t.progress = (t.progress * 0.15).toFixed(4) * 1
              return self.onProgress(self.useUnderline ? util.upperCaseToUnderlineByObj(t) : t)
            }
          })
        }
      }).then(function (res) {
        Object.assign(self._fileInfo, res)
      })
    })
    .then(function getFileIdRun () {
      var key
      var fileInfo = util.clone(self._fileInfo)

      fileInfo.manageType = self.manageType || 'anonymous'
      fileInfo.directory = self.directory || 'common/other'
      fileInfo.authType = self.authType || 'unknown'
      for (key in fileInfo) {
        if (typeof fileInfo[key] !== 'string' && typeof fileInfo[key] !== 'number' && typeof fileInfo[key] !== 'boolean') {
          delete fileInfo[key]
        }
        if (key === 'lastModified') {
          fileInfo[key] = parseInt(fileInfo[key] / 1000)
        }
      }
      var _promise = self.getFileId(self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo)
      if (_promise instanceof Promise) {
        return _promise
      } else {
        return Promise.reject(util.setErrorId('GET_FILE_ID_RETURN_PROMISE', new Error('optionts.getFileId does not return Promise')))
      }
    })
    .then(function getFileIdCheck (res) {
      res = util.clone(res)
      var keyt, key, value
      for (key in res) {
        value = res[key]
        // 转驼峰
        keyt = util.underlineToUpperCase(key)
        if (keyt !== key) {
          delete res[key]
          res[keyt] = value
        }
      }

      // 状态为检测返回信息
      self._fileInfo.status = 'checkFileId'
      // 用户取消上传
      if (self._isAbort === true) {
        return getSign.getAbortError()
      }
      if (!res.fileId) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_Id_ERROR', new Error('server return fileId error')))
      }
      if (!res.fileCrc32) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_CRC32_ERROR', new Error('server return fileCrc32 error')))
      }
      if (!res.fileMd5) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_MD5_ERROR', new Error('server return fileMd5 error')))
      }
      if (!res.fileSha1) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_SHA1_ERROR', new Error('server return fileSha1 error')))
      }
      if (!res.url) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_URL_ERROR', new Error('server return url error')))
      }
      self._fileInfo.url = res.url
      self._fileInfo.fileId = res.fileId
      self._fileInfo.fileCrc32 = res.fileCrc32
      self._fileInfo.fileMd5 = res.fileMd5
      self._fileInfo.fileSha1 = res.fileSha1
      self._fileInfo.isUploadEnd = res.isUploadEnd || false
      if (!res.isUploadEnd) {
        return self.uploadRun()
      }
    })
    .then(function () {
      var res = util.clone(self._fileInfo)
      self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res)
    })
  },
  uploadRun: function () {
    var self = this
    return Promise.resolve()
    .then(function getFilePartInfoRun () {
      var fileInfo = {
        fileId: self._fileInfo.fileId,
        fileCrc32: self._fileInfo.fileCrc32,
        fileMd5: self._fileInfo.fileMd5,
        fileSha1: self._fileInfo.fileSha1
      }
      var _promise = self.getFilePartInfo(self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo)
      if (_promise instanceof Promise) {
        return _promise
      } else {
        return Promise.reject(util.setErrorId('GET_FILE_PART_INFO_RETURN_PROMISE', new Error('optionts.getFilePartInfo does not return Promise')))
      }
    })
    .then(function getFilePartInfoCheck (res) {
      res = util.clone(res)
      var keyt, key, value
      for (key in res) {
        value = res[key]
        // 转驼峰
        keyt = util.underlineToUpperCase(key)
        if (keyt !== key) {
          delete res[key]
          res[keyt] = value
        }
      }
      // 状态为签名前
      self._fileInfo.status = 'checkFilePartInfo'
      // 用户取消上传
      if (self._isAbort === true) {
        return getSign.getAbortError()
      }
      if (!res.fileSize) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_SIZE_ERROR', new Error('server return fileSize error')))
      }
      if (!res.partSize) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_CRC32_ERROR', new Error('server return partSize error')))
      }
      if (!res.doneParts || !util.isArray(res.doneParts)) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_DOME_PARTS_ERROR', new Error('server return doneParts error')))
      }
      if (!res.partSum) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_SUM_ERROR', new Error('server return partSum error')))
      }
      self._fileInfo.fileSize = parseFloat(res.fileSize)
      self._fileInfo.partSize = parseFloat(res.partSize)
      self._fileInfo.doneParts = res.doneParts
      self._fileInfo.partSum = parseFloat(res.partSum)
      self._fileInfo.partNow = 0
      self._fileInfo.uploadSizeComplete = 0
      self._fileInfo.isUploadEnd = res.isUploadEnd || self._fileInfo.isUploadEnd || false
      if (!res.isUploadEnd) {
        return self.uploadPart()
      }
    })
  },
  uploadPart: function () {
    var self = this
    self.onProgressUploadEmit()
    .then(function () {
      self._fileInfo.partNow = self._fileInfo.partNow === void 0 ? -1 : self._fileInfo.partNow
      while (++self._fileInfo.partNow <= self._fileInfo.partSum) {
        if (self._fileInfo.partNow === 0 || util.inArray(self._fileInfo.partNow, self._fileInfo.doneParts)) {
          continue
        }
        return self.uploadPartRun()
      }
      return self.completeUploadSubmit()
    })
  },
  uploadPartRun: function () {
    var self = this
    return this.uploadPartFile(this._fileInfo.partNow)
    .then(function () {
      return self.uploadPart()
    })
  },
  uploadPartFile: function (partNum) {
    var self = this
      // 状态为签名前
    this._fileInfo.status = 'uploadPartFile'
      // 用户取消上传
    if (this._isAbort === true) {
      return getSign.getAbortError()
    }
    return new Promise(function (resolve, reject) {
      var readSizePos, readSizeEnd, blobSlice
      // 计算切片起点 (当前块-1)*分块大小
      readSizePos = self._fileInfo.partSize * (partNum - 1)
      // 结尾
      readSizeEnd = Math.min(readSizePos + self._fileInfo.partSize, self._fileInfo.fileSize)

      // 切片
      if (self.file.slice) {
        blobSlice = self.file.slice(readSizePos, readSizeEnd)
      } else if (self.file.webkitSlice) {
        blobSlice = self.file.webkitSlice(readSizePos, readSizeEnd)
      }
      // self.file_info.part_now
      /* global FileReader:true */
      var fileReader = new FileReader()
      // 文件读取后的处理
      fileReader.onload = function (res) {
        self._fileInfo.status = 'progressiveReadNextRunEnd'
        resolve({
          fileInfo: {
            partNumber: partNum,
            partLength: readSizeEnd - readSizePos
          },
          file: res
        })
      }
      fileReader.onerror = function (e) {
        self._fileInfo.status = 'getUploadPartMd5Error'
        reject(util.setErrorId('LOAD_FILE_ERROR', e))
      }
      // 开始读流
      try {
        fileReader.readAsArrayBuffer(blobSlice)
      } catch (e) {
        reject(util.setErrorId('LOAD_FILE_ERROR', e))
      }
    }).then(function getFilePartMd5AndFileInfoRun (res) {
      var contentMd5 = cryptoJsCore.MD5(getSign.arrayBufferToWordArray(res.file.target.result)).toString(cryptoJsCore.enc.Base64)
      var fileInfo = res.fileInfo
      fileInfo.contentMd5 = contentMd5
      fileInfo.md5Base64 = fileInfo.contentMd5
      Object.assign(fileInfo, {
        deviceType: self._fileInfo.deviceType,
        fileId: self._fileInfo.fileId,
        fileCrc32: self._fileInfo.fileCrc32,
        fileMd5: self._fileInfo.fileMd5,
        fileSha1: self._fileInfo.fileSha1
      })
      return {fileInfo: fileInfo, rawData: res.file.target.result}
    }).then(function getFilePartMd5All (res) {
      return Promise.resolve().then(function getFilePartMd5Run () {
        var _promise = self.getFilePartSign(self.useUnderline ? util.upperCaseToUnderlineByObj(res.fileInfo) : res.fileInfo)
        if (_promise instanceof Promise) {
          return _promise
        } else {
          return Promise.reject(util.setErrorId('GET_FILE_PART_SIGN_RETURN_PROMISE', new Error('optionts.getFilePartSign does not return Promise')))
        }
      }).then(function getFilePartMd5Check (data) {
        if (!data.url) {
          return Promise.reject(util.setErrorId('SERVER_RETURN_URL_ERROR', new Error('server return url error')))
        }
        if (!data.method) {
          return Promise.reject(util.setErrorId('SERVER_RETURN_METHOD_ERROR', new Error('server return method error')))
        }
        if (!data.headers) {
          return Promise.reject(util.setErrorId('SERVER_RETURN_HEADERS_ERROR', new Error('server return headers error')))
        }
        return {
          data: data,
          rawData: res.rawData
        }
      })
    }).then(function sendUploadPartRun (res) {
      self._fileInfo.status = 'sendUploadPart'
      return sendUploadPart(res.data, res.rawData)
    })
  },
  onProgressUploadEmit: function (progress) {
    if (!progress) {
      progress = (util.isArray(this._fileInfo.doneParts) ? this._fileInfo.doneParts.length : 0) / this._fileInfo.partSum
    }
    var self = this
    var res
    res = {}
    res.status = this.status
    res.progress = ((progress || 0).toFixed(4) * 1) || 0
    return Promise.resolve()
    .then(function onProgressSignEmit () {
      if (util.isFunction(self.onProgressUpload)) {
        return self.onProgressUpload(self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res))
      }
    })
    .then(function onProgressEmit () {
      if (util.isFunction(self.onProgress)) {
        var t = util.clone(res)
        t.progress = ((t.progress * 0.85) + 0.15).toFixed(4) * 1
        return self.onProgress(self.useUnderline ? util.upperCaseToUnderlineByObj(t) : t)
      }
    })
  },
  // 合并上传提交
  completeUploadSubmit: function () {
    this._fileInfo.status = 'completeUpload'
    var fileInfo = {
      fileId: this._fileInfo.fileId,
      fileCrc32: this._fileInfo.fileCrc32,
      fileMd5: this._fileInfo.fileMd5,
      fileSha1: this._fileInfo.fileSha1
    }
    var _promise = this.completeUpload(this.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo)
    if (_promise instanceof Promise) {
      return _promise
    } else {
      return Promise.reject(util.setErrorId('COMPLETE_UPLOAD_RETURN_PROMISE', new Error('optionts.completeUpload does not return Promise')))
    }
  },
  // 合并上传
  completeUpload: function (fileInfo) {
    return api.api(this.completeUploadUrl || 'v1_0/upload/complete').method(this.completeUploadMethod || 'POST').send(fileInfo).then(function (res) {
      return res && res.data || {}
    })
  },
  // 获取上传文件分块信息
  getFilePartSign: function (fileInfo) {
    return api.api(this.getFilePartSignUrl || 'v1_0/upload/file_part_md5').method(this.getFilePartSignMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {}
    })
  },
  // 获取上传文件分块信息
  getFilePartInfo: function (fileInfo) {
    return api.api(this.getFilePartInfoUrl || 'v1_0/upload/file_part_info').method(this.getFilePartInfoMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {}
    })
  },
  // 获取上传文件id
  getFileId: function (fileInfo) {
    return api.api(this.getFileIdUrl || 'v1_0/upload/file_id').method(this.getFileIdMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {}
    })
  },
  // 获取上传文件分块大小
  getPartSize: function (fileInfo) {
    return api.api(this.getPartSizeUrl || 'v1_0/upload/file_part_size').method(this.getPartSizeMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {}
    })
  }
}

