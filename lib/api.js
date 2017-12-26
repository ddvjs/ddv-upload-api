module.exports = DdvUploadApi
function DdvUploadApi (options) {
  if (this instanceof DdvUploadApi) {
    return this.constructor(options)
  } else {
    return new DdvUploadApi(options)
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
