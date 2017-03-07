var util = module.exports = {
  // 把对象中所以驼峰的key转小写下滑杠
  upperCaseToUnderlineByObj: function (obj) {
    if (typeof obj === 'object') {
      var keyt, key, value
      for (key in obj) {
        value = util.upperCaseToUnderlineByObj(obj[key])
        keyt = typeof key === 'string' ? util.upperCaseToUnderline(key) : key
        delete obj[key]
        obj[keyt] = value
      }
    }
    return obj
  },
  // 驼峰单纯转小写下滑杠
  upperCaseToUnderline: function upperCaseToUnderline (str) {
    return str.toString().replace(/([A-Z])/g, function (a) { return '_' + (a || '').toLowerCase() })
  },
  // 驼峰单纯转小写下滑杠
  underlineToUpperCase: function underlineToUpperCase (str) {
    return str.toString().replace(/(_[a-zA-Z0-9]{1})/g, function (a) { return (a.substr(1) || '').toUpperCase() })
  },
  // 设置错误id
  setErrorId: function setErrorId (errorId, error) {
    error.errorId = errorId
    error.error_id = errorId
    return error
  },
  // 参数强转数组
  argsToArray (args) {
    return Array.prototype.slice.call(args)
  },
  // 判断是一个方法
  isFunction: function isFunction (fn) {
    return typeof fn === 'function'
  },

  // 类似php里面的inArray
  inArray: function inArray (a, b) {
    if (!util.isArray(b)) {
      return false
    }
    for (var i in b) {
      if (b[i] === a) {
        return true
      }
    }
    return false
  },
  // 判断是否为一个数组
  isArray () {
    return Array.isArray.apply(this, arguments)
  },
  isNumber (obj) {
    return (typeof obj === 'string' || typeof obj === 'number') && (!util.isArray(obj) && (obj - parseFloat(obj) >= 0))
  },
  // 判断是否一个标准的global
  isGlobal (obj) {
    return obj !== void 0 && obj === obj.global
  },
  // 克隆
  clone: function clone (myObj) {
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

}
