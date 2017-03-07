'use strict'
module.exports = DdvUploadApi
function DdvUploadApi (option) {
  if (!(this instanceof DdvUploadApi)) {
    return new DdvUploadApi(option)
  } else {
    return this.constructor(option)
  }
}
// 提供外部设定api
DdvUploadApi.setApi = function (fn) {
  DdvUploadApi.api = fn
}
// 设定继承
if (!DdvUploadApi.prototype) {
  DdvUploadApi.prototype = {}
}
// 合并继承
Object.assign(DdvUploadApi.prototype, require('./apip.js'))
