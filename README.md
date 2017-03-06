# ddv-upload
>这是一个基于[Promise](https://www.promisejs.org/)封装的请求模块

## 安装

**npm:**

```shell
$ npm install ddv-upload
```

**引入:**

```javascript
import * as api from 'ddv-upload';
```


**独立版本:**

你可以直接使用`<script>`标签直接引入， `ddvUpload` 会被注册为一个全局变量。

```html
<script src="https://unpkg.com/ddv-upload/dist/api.js"></script>
```

需要注意的是，为了兼容IE9以下版本浏览器需要预先加载[es5-shim](https://github.com/es-shims/es5-shim)。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.min.js"></script>
```

