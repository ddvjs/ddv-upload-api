'use strict'
module.exports = GetSign
// 工具
var util = require('../util')
var crc32 = require('./crc32.js')
// 编码库
var cryptoJsCore = require('crypto-js/core')
// 事件
var eventNames = 'before complete progress error complete'.split(' ')
// 获取签名
function GetSign (optionts) {
  if (this instanceof GetSign) {
    return this.constructor(optionts)
  } else {
    return new GetSign(optionts)
  }
}

// 合并继承
Object.assign(GetSign.prototype, {
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
      // 默认没有中断
      self.signIsAbort = false
      // 签名信息
      self.sign = {}
      // 文件信息
      self.signFileInfo = {}
      // 上传完成
      self.signResolve = resolve
      // 上传失败
      self.signReject = reject
      // 运行程序
      self.run()
      // 回收
      resolve = reject = void 0
    })
    setTimeout(function () {
      // 回收
      _promise = void 0
    }, 0)
    // 错误事件
    if (self.onError && util.isFunction(self.onError)) {
      _promise.catch(self.onError)
      delete self.onError
    }
    // 完成事件
    if (self.onComplete && util.isFunction(self.onComplete)) {
      _promise.then(self.onComplete)
      delete self.onComplete
    }
    // 返回一个 Promise
    return _promise
  },
  run: function () {
    var self = this
    this.initCheck()
    .then(function onBeforeRun () {
      // 如果存在签名前操作
      if (util.isFunction(self.onBefore)) {
        // 运行签名前
        var res = self.onBefore(self.signFileInfo)
        if (res === false) {
          // 返回中断
          return GetSign.getAbortError()
        } else if (res instanceof Promise) {
          // 返回承诺
          return res
        }
      }
    })
    .then(function initSwitchRun () {
      // 用户取消上传
      if (self.signIsAbort === true) {
        return GetSign.getAbortError()
      }
      return self.initSwitch()
    })
    .then(function Run () {
      // 用户取消上传
      if (self.signIsAbort === true) {
        return GetSign.getAbortError()
      }
      return self.Run()
    })
    .then(function progressiveReadRun () {
      return self.progressiveRead()
    })
    .then(function progressiveReadDoneRun () {
      return self.progressiveReadDone()
    })
    .then(function returnRes () {
      return self.signFileInfo
    }).catch(function (e) {
      // 用户取消上传
      if (self.signIsAbort === true) {
        return GetSign.getAbortError()
      }
      return Promise.reject(e)
    }).then(self.signResolve, self.signReject)
  },
  // 完成
  progressiveReadDone: function (res) {
    var i, len, key
    this.signIsProgressiveReadDone = true
    this.status = 'readFileDone'
    this.signFileInfo.endTime = new Date()
    this.signFileInfo.signTime = this.signFileInfo.endTime - this.signFileInfo.startTime

    if (this.signIsPartMd5) {
      this.signPartMd5Upper = cryptoJsCore.MD5(this.signPartMd5.toUpperCase()).toString(cryptoJsCore.enc.Hex)
      this.signPartMd5Lower = cryptoJsCore.MD5(this.signPartMd5.toLowerCase()).toString(cryptoJsCore.enc.Hex)
      this.signPartMd5Upper = (this.signPartMd5Upper + '-' + this.signPartMd5Length.toString()).toUpperCase()
      this.signPartMd5Lower = (this.signPartMd5Lower + '-' + this.signPartMd5Length.toString()).toUpperCase()

      this.signFileInfo.filePartMd5Upper = this.signPartMd5Upper
      this.signFileInfo.filePartMd5Lower = this.signPartMd5Lower
    }
    // 其它加密信息
    i = 0
    len = this.signEnabledAlgo.length
    for (i = 0; i < len; i++) {
      key = this.signEnabledAlgo[i].name.toLowerCase()
      if (key && key.length > 0) {
        key = key.substr(0, 1).toUpperCase() + key.substr(1)
      }
      this.signFileInfo['file' + key] = this.signEnabledAlgo[i].instance.finalize().toString(cryptoJsCore.enc.Hex).toUpperCase()
    }
    // crc32
    if (this.signIsCrc32) {
      this.signFileInfo.fileCrc32 = crc32(this.signCrc32intermediate, true).toUpperCase()
    }
  },
  // 运行哈希签名
  progressiveReadHashWork: function (res) {
    var i, len, WordArrayData, arrayBufferData
    arrayBufferData = res.target.result

    if (this.signEnabledAlgo && this.signEnabledAlgo.length > 0) {
      WordArrayData = GetSign.arrayBufferToWordArray(arrayBufferData)
    }

    if (this.signIsPartMd5) {
      this.signPartMd5Length++
      this.signPartMd5 += cryptoJsCore.MD5(WordArrayData).toString(cryptoJsCore.enc.Hex)
    }

    i = 0
    len = this.signEnabledAlgo.length
    for (i = 0; i < len; i++) {
      this.signEnabledAlgo[i].instance.update(WordArrayData)
    }

    // crc32
    if (this.signIsCrc32) {
      this.signCrc32intermediate = crc32(new Uint8Array(arrayBufferData), this.signCrc32intermediate)
    }
  },
  // 读取分块数据
  progressiveReadPartRun: function () {
    this.readSizeEnd = Math.min(this.signPos + this.partSize, this.fileSize)
    var blobSlice
    var fileReader
    var self = this
    // 切片
    if (this.file.slice) {
      blobSlice = this.file.slice(this.signPos, this.readSizeEnd)
    } else if (this.file.webkitSlice) {
      blobSlice = this.file.webkitSlice(this.signPos, this.readSizeEnd)
    }
    return new Promise(function (resolve, reject) {
      /* global FileReader:true */
      fileReader = new FileReader()
        // 文件读取后的处理
      fileReader.onload = function (res) {
        self.status = 'progressiveReadNextRunEnd'
        resolve(res)
      }
      fileReader.onerror = function (e) {
        self.status = 'progressiveReadNextRunError'
        reject(util.setErrorId('LOAD_FILE_ERROR', e))
      }
      self.status = 'progressiveReadNextRunIng'
      // 开始读流
      try {
        fileReader.readAsArrayBuffer(blobSlice)
      } catch (e) {
        reject(util.setErrorId('LOAD_FILE_ERROR', e))
      }
      blobSlice = fileReader = void 0
    }).then(function progressiveReadHashWorkRun (res) {
      // 处理数据
      return self.progressiveReadHashWork(res)
    }).then(function RogressRun () {
      self.signPos = self.readSizeEnd
      self.signReadpos = self.signPos
      return self.onProgressEmit()
    }).then(function progressiveReadNextCheck () {
      if (self.signPos < self.fileSize) {
        // 读取下一片
        return self.progressiveReadNext()
      }
    })
  },
  // 读取下一分块
  progressiveReadNext: function () {
    this.status = 'progressiveReadNext'
    // 用户取消上传
    if (this.signIsAbort === true) {
      return false
    }
    return this.progressiveReadPartRun()
  },
  // 读取数据
  progressiveRead: function () {
    this.status = 'progressiveRead'
    this.partSize = this.partSize || 2 * 1024 * 1024 // 20KiB at a time
    this.fileSize = this.fileSize || this.signFileInfo.fileSize || 0
    this.signPos = 0
    return this.progressiveReadNext()
  },
  // 运行
  Run: function () {
    var i, current
    for (i = 0; i < this.CryptoJSAlgo.length; i++) {
      current = this.CryptoJSAlgo[i]
      if (util.inArray(current.name.toString().toLowerCase(), this.switch)) {
        this.signEnabledAlgo.push({
          name: current.name,
          instance: current.algo.create(current.param)
        })
      }
    }
    // 分块md5
    if (this.signIsPartMd5) {
      this.signPartMd5Length = 0
      this.signPartMd5 = ''
      this.signPartMd5Lower = ''
      this.signPartMd5Upper = ''
    }
    // Special case CRC32 as it's not part of CryptoJS and takes another input format.
    if (this.signIsCrc32) {
      this.signCrc32intermediate = 0
    }
    // 开始时间
    this.signFileInfo.startTime = new Date()
    this.status = 'readFileing'
    return Promise.resolve()
  },
  onProgressEmit: function () {
    var _promise, data
    data = {}
    data.status = this.status
    data.progress = (this.signReadpos / this.fileSize).toFixed(4) * 1
    if (util.isFunction(this.onProgress, 'function')) {
      _promise = this.onProgress(data)
      if (_promise instanceof Promise) {
        return _promise
      }
    }
  },
  initSwitch: function () {
    var i, CryptoJSLibName
    this.signIsCrc32 = false
    this.signIsPartMd5 = false
    // md5块
    var partmd5 = this.switch.indexOf('partmd5')
    if (partmd5 > -1) {
      // 清理这个
      this.switch.splice(partmd5, 1)
      this.signIsPartMd5 = true
      if (!util.inArray('md5', this.switch)) {
        this.switch.push('md5')
      }
    }
    // md5块
    var crc32 = this.switch.indexOf('crc32')
    if (crc32 > -1) {
      // 清理这个
      this.switch.splice(crc32, 1)
      this.signIsCrc32 = true
    }
    if (util.isArray(this.switch) && this.switch.length > 0) {
      for (i = 0; i < this.switch.length; i++) {
        if (!this.switch[i]) continue
        CryptoJSLibName = this.switch[i].toString().toUpperCase()
        if (cryptoJsCore.algo[CryptoJSLibName]) {
          this.CryptoJSAlgo.push({
            name: CryptoJSLibName,
            algo: cryptoJsCore.algo[CryptoJSLibName],
            param: undefined
          })
        } else {
          // 用户取消上传
          if (this.signIsAbort === true) {
            return GetSign.getAbortError()
          }
          return Promise.reject(util.setErrorId('LOAD_LIB_' + CryptoJSLibName + '_ERROR', new Error('load libraries ' + CryptoJSLibName + ' error')))
        }
      }
    }
  },
  initCheck: function () {
    this.file = this.file || undefined
    if (!GetSign.isCompatible()) {
      return Promise.reject(util.setErrorId('NOT_SUPPORT_FILEREADER_OR_BLOB', new Error('Your browser does not support FileReader Or Blob')))
    } else if (this.file === undefined || this.file === null) {
      return Promise.reject(util.setErrorId('SIGNATURE_FILE_NOT_FOUND', new Error('Signature file not found')))
    }
    try {
      // 每次读取文件多大字节 默认：20KiB at a time
      this.partSize = this.partSize || (2 * 1024 * 1024)
      // 签名数组
      this.switch = util.isArray(this.switch) ? this.switch : ['crc32', 'md5', 'sha1']
      // 文件名称
      this.signFileInfo.fileName = this.file.name
      // 文件类型
      this.signFileInfo.fileType = this.file.type
      // 文件大小
      this.signFileInfo.fileSize = this.file.size
      // 最后修改日期时间戳
      this.signFileInfo.lastModified = this.file.lastModified
      // 最后修改日期对象
      this.signFileInfo.lastModifiedTime = this.file.lastModifiedDate
      // 已经签名的大小
      this.signPos = 0
      // 加密模块
      this.CryptoJSAlgo = this.CryptoJSAlgo || []
      // 开启签名模块
      this.signEnabledAlgo = []
    } catch (e) {
      return Promise.reject(e)
    }
    return Promise.resolve(this)
  }
})
GetSign.getAbortError = function () {
  return Promise.reject(util.setErrorId('USER_ABORT', new Error('User abort file sign')))
}
GetSign.isCompatible = function () {
  try {
    // Check for FileApi
    if (typeof FileReader === 'undefined') return false

    // Check for Blob and slice api
    if (typeof Blob === 'undefined') return false
  } catch (e) {
    return false
  }
  return true
}

GetSign.arrayBufferToWordArray = function arrayBufferToWordArray (arrayBuffer) {
  var fullWords = Math.floor(arrayBuffer.byteLength / 4)
  var bytesLeft = arrayBuffer.byteLength % 4

  var u32 = new Uint32Array(arrayBuffer, 0, fullWords)
  var u8 = new Uint8Array(arrayBuffer)
  var pad
  var cp = []
  var i = 0
  for (i = 0; i < fullWords; ++i) {
    cp.push(GetSign.swapendian32(u32[i]))
  }

  if (bytesLeft) {
    pad = 0
    i = bytesLeft
    for (i = bytesLeft; i > 0; --i) {
      pad = pad << 8
      pad += u8[u8.byteLength - i]
    }
    i = 0
    for (i = 0; i < 4 - bytesLeft; ++i) {
      pad = pad << 8
    }

    cp.push(pad)
  }
  return cryptoJsCore.lib.WordArray.create(cp, arrayBuffer.byteLength)
}
GetSign.swapendian32 = function swapendian32 (val) {
  return (((val & 0xFF) << 24) | ((val & 0xFF00) << 8) | ((val >> 8) & 0xFF00) | ((val >> 24) & 0xFF)) >>> 0
}

