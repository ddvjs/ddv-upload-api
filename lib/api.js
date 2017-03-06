'use strict'
var api = module.exports = function DdvUploadApi (option) {
  if (!(this instanceof DdvUploadApi)) {
    return new DdvUploadApi(option)
  } else {
    return this.init(option)
  }
}
if (!api.prototype) {
  api.prototype = {}
}
Object.assign(api.prototype, require('./apip.js'))
api.setApi = function (fn) {
  api.api = fn
}
