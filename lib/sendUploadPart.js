'use strict'
module.exports = sendUploadPart
function sendUploadPart (optionts, rawData) {
  return new Promise(function (resolve, reject) {
    var xhr

    // 创建 - 非IE6 - 第一步
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest()
    } else {
      // IE6及其以下版本浏览器
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    }

    // 接收 - 第三步
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status
        var statusText = xhr.statusText
        if (status >= 200 && status < 300) {
          var serverRes = {}
          serverRes.headers = {}
          serverRes.rawHeaders = []
          serverRes.body = xhr.response
          serverRes.statusCode = xhr.status
          serverRes.statusMessage = xhr.statusText
          serverRes.status = xhr.statusText

          var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
          headers.forEach(function (header) {
            var matches = header.match(/^([^:]+):\s*(.*)/)
            if (matches) {
              var key = matches[1].toLowerCase()
              if (key === 'set-cookie') {
                if (serverRes.headers[key] === undefined) {
                  serverRes.headers[key] = []
                }
                serverRes.headers[key].push(matches[2])
              } else if (serverRes.headers[key] !== undefined) {
                serverRes.headers[key] += ', ' + matches[2]
              } else {
                serverRes.headers[key] = matches[2]
              }
              serverRes.rawHeaders.push(matches[1], matches[2])
            }
          })
          resolve(serverRes)
        } else {
          var e = new Error(statusText)
          e.statusCode = xhr.status
          e.statusMessage = xhr.statusText
          e.status = xhr.statusText
          reject(e)
        }
      }
    }
    // 连接 和 发送 - 第二步
    xhr.open((optionts.method || 'GET').toUpperCase(), optionts.url, true)
    // 设置表单提交时的内容类型
    var key, value, headers
    headers = optionts.headers
    for (key in headers) {
      if (key.toLowerCase() === 'host' || key.toLowerCase() === 'content-length') {
        continue
      }
      value = headers[key]
      if (Array.isArray(value)) {
        value.forEach(function (vt) {
          xhr.setRequestHeader(key, vt)
        })
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
      value = Array.isArray(value) ? value.join(' ') : value
    }
    xhr.send(rawData || null)
  })
}
