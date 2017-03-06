'use strict'
var api = require('./api.js')
var eventNames = 'beforeSign completeSign progress progressSign progressUpload error complete'.split(' ')
module.exports = {
  init: function (option) {
    // 初始化事件
    this.optionInit(option)
    return this.runInit()
  },
  optionInit: function (option) {
    var key, value, tkey
    for (key in option) {
      value = option[key]
      tkey = key.substr(2, 1).toLowerCase() + key.substr(3)
      if (!key) continue
      if (eventNames.indexOf(key) > -1) {
        if (isFunction(value)) {
          this['on' + key.substr(0, 1).toUpperCase() + key.substr(1)] = value
        }
      } else if (eventNames.indexOf(tkey) > -1) {
        if (isFunction(value)) {
          this[key] = value
        }
      } else {
        this[key] = option[key]
      }
    }
    key = value = tkey = option = void 0
  },
  runInit: function () {
    var _this = this
    var _promise = new Promise(function (resolve, reject) {
      _this.useUnderline = _this.useUnderline === void 0 ? false : _this.useUnderline
      // 默认没有中断
      _this._isAbort = false
      // 签名信息
      _this._sign = null
      // 文件信息
      _this._fileInfo = {}
      // 获取文件大小
      _this._fileInfo.fileSize = _this.file.size
      // 获取文件类型
      _this._fileInfo.fileType = _this.file.type
      // 上传完成
      _this.uploadResolve = resolve
      // 上传失败
      _this.uploadReject = reject
      // 运行程序
      _this.run()
      // 回收
      resolve = reject = void 0
    }).then(function () {
      return (_this.useUnderline ? upperCasetoUnderlineByObj(_this._fileInfo) : _this._fileInfo)
    })
    setTimeout(function () {
      // 回收
      _promise = void 0
    }, 0)
    // 错误事件
    if (this.onError && isFunction(this.onError)) {
      _promise.catch(this.onError)
      delete this.onError
    }
    // 完成事件
    if (this.onComplete && isFunction(this.onComplete)) {
      _promise.then(this.onComplete)
      delete this.onComplete
    }
    // 返回一个 Promise
    return _promise
  },
  run: function () {
    var _this = this
    new Promise(function (resolve, reject) {
      // 设备类型
      _this._fileInfo.deviceType = _this.deviceType || 'html5'
      if (isFunction(api.api)) {
        resolve()
      } else {
        reject(setErrorId('NOT_SET_API_METHOD', new Error('Please set the Api request method')))
      }
    })
    // 获取分开大小
    .then(function getPartSizeRun () {
      var fileInfo = clone(_this._fileInfo)
      var _promise = _this.getPartSize(_this.useUnderline ? upperCasetoUnderlineByObj(fileInfo) : fileInfo)
      if (_promise instanceof Promise) {
        return _promise
      } else {
        return Promise.reject(setErrorId('GET_PART_SIZE_RETURN_PROMISE', new Error('option.getPartSize does not return Promise')))
      }
    })
    .then(function checkPartSize (partSize) {
      if (!partSize.part_size) {
        return Promise.reject(setErrorId('SERVER_RETURN_PART_SIZE_ERROR', new Error('server return part_size error')))
      }
      if (!partSize.part_sum) {
        return Promise.reject(setErrorId('SERVER_RETURN_PART_SUM_ERROR', new Error('server return part_sum error')))
      }

      _this._fileInfo.partSize = partSize.partSize || partSize.part_size
      _this._fileInfo.partSum = partSize.partSum || partSize.part_sum
    })
    .then(function () {
      console.log('_this.fileInfo', _this._fileInfo)
    })
    console.log('ddd', this)
  },
  getPartSize: function (fileInfo) {
    return api.api(this.getPartSizeUrl || 'v1_0/upload/file_part_size').method(this.getPartSizeUrlMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {}
    })
  }
}

function isFunction (fn) {
  return typeof fn === 'function'
}
function upperCasetoUnderlineByObj (obj) {
  if (typeof obj === 'object') {
    var keyt, key, value
    for (key in obj) {
      value = upperCasetoUnderlineByObj(obj[key])
      keyt = typeof key === 'string' ? upperCasetoUnderline(key) : key
      delete obj[key]
      obj[keyt] = value
    }
  }
  return obj
}
function upperCasetoUnderline (str) {
  return str.toString().replace(/([A-Z])/g, function (a) { return '_' + (a || '').toLowerCase() })
}
function setErrorId (errorId, error) {
  error.errorId = errorId
  error.error_id = errorId
}
function clone (myObj) {
  var i, myNewObj
  if (!(myObj && typeof myObj === 'object')) {
    return myObj
  }
  if (myObj === null || myObj === undefined) {
    return myObj
  }
  myNewObj = ''
  if (Array.isArray(myObj)) {
    myNewObj = []
    for (i = 0; i < myObj.length; i++) {
      myNewObj.push(myObj[i])
    }
  } else if (typeof myObj === 'object') {
    myNewObj = {}
      // 防止克隆ie下克隆  Element 出问题
    if (myObj.innerHTML !== undefined && myObj.innerText !== undefined && myObj.tagName !== undefined && myObj.tabIndex !== undefined) {
      myNewObj = myObj
    } else {
      for (i in myObj) {
        myNewObj[i] = clone(myObj[i])
      }
    }
  }
  return myNewObj
}

