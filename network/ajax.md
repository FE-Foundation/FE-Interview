``Ajax``，是``Asynchronous  JavaScript``的缩写。

```
function ajax(url, options) {
    var xhr = new XMLHttpRequest(),
        urlParam = '';

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                options.onsuccess && options.onsuccess(xhr.responseText);
            } else {
                options.onfail && options.onfail(xhr.status);
            }
        }
    };

    if (options.data) {
        var array = [];
        for (var i in options.data) {
             array.push(encodeURIComponent(i) + '=' + encodeURIComponent(options.data[i]));
        }
        urlParam = array.join('&');
    }

    options.type = options.type || 'get';

    if (options.type === 'get') {
        if (options.data) {
            url += '?' + urlParam;
        }
        xhr.open('get', url, true);
        xhr.send(null);
    } else if (options.type == 'post') {
        xhr.open('post', url, true);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(urlParam);
    }
}
```
构造数据也可以用``FormData``：
```
var data = new FormData();
data.append("key", "value");

var data = new FormData(document.forms[0]);
```
同源策略：``XHR``对象只能访问与包含它的页面位于同一个域中的资源。同一域名，端口或协议不同也不行；一级域名相同，二级域名不同也不行。

用``Node.js``的``Express``框架，起两个服务：
一个监听``8000``端口：
```
app.use('/', function (req, res) {
  var data = {
    'name': 'OriginalSoul'
  };

  res.json(data);
});
```
另一个监听``9000``端口，同时跨域请求访问``8000``服务的数据：
```
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        alert(xhr.status + ',' + xhr.responseText);
    }
};
xhr.open('get','http://localhost:8000',true);
xhr.send(null);
```
浏览器会提示：
``XMLHttpRequest cannot load http://localhost:8000/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:9000' is therefore not allowed access.``

解决方案：
---
**JSONP**：
将``9000``客户端调用代码改为：
```
function handleResponse (res) {
    alert(res.name);
}

var script = document.createElement("script");
script.src = "http://localhost:8000/?callback=handleResponse";
document.body.appendChild(script);
```
将``8000``服务端代码改为：
```
app.use('/', function (req, res) {
  var data = {
    'name': 'OriginalSoul'
  };

  res.send(req.query.callback+ '(' + JSON.stringify(data) +')');
});
```
启动访问，客户端会弹框出``OriginalSoul``。

**Web Sockets**
``Web Sockets``建立在``TCP``之上，提供全双工，双向通信。不受同源策略的限制。

``9000``客户端：
```
var socket = new WebSocket("ws://localhost:8000");
socket.onmessage = function (event) {
    console.log(JSON.parse(event.data).name);
};
```
``8000``服务端，引入了``ws``模块，提供``Web Socket``服务：
```
var server = require('http').createServer();
var express = require('express');
var WebSocketServer = require('ws').Server;
var app = express();
var wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {
  var data = {
    'name': 'OriginalSoul'
  };
  ws.send(JSON.stringify(data));
});

server.on('request', app);
server.listen(8000);
```

**CORS**
``Cross-Origin Resource Sharing``跨域资源共享。只需要在响应的头部设置``Access-Control-Allow-Origin``即可。

之前跨域失败的例子基本不变，只改动``8000``的服务端代码，加一行
```
res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
```
客户端访问弹出``200,{"name":"OriginalSoul"}``