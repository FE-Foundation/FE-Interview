#Streams
流是``Node``中非常有用的一组``API``，其中包含可读流(``ReadStream``)和可写流(``WriteStream``)两大类，它们在``Node``中的应用非常广泛，大多是的实例对象都是基于它们实现的。

###可读流 ReadStream
可读流：好像数据阀门，可以对其控制。

流以块为单位，通过监听``data``事件，一旦有数据块可读，就可从回调函数中读到响应的数据，数据的类型一般是``Buffer``和字符串：
```javascript
var readStream = ...
readStream.on('data', function (chunk) {
    //chunk is a Buffer/UTF-8 encoded string
})
```
``end``结束事件：
```javascript
readStream.on('end', function () {
    console.log('the stream has ended');
})
```
暂停：
```javascript
readStream.pause();
```
恢复：
```javascript
readStream.resume();
```

###可写流 WriteStream
可写流：提供了开发者一个可写数据的空间。这个空间可以是一个文件、一个网络连接，或者是一个用于转换数据格式的对象（比如压缩文件）。

可以向流对象中写入``Buffer``或字符串：
```javascript
var writeStream = ...;
writeStream.write('this is an UTF-8 string');
```
默认``utf-8``，可以自定义编码：
```
writeStream.write('...','base64');
```
写入``Buffer``：
```javascript
var buffer = new Buffer('this is a buffer');
writeStream.write(buffer);
```

###文件系统流对象 filesystem streams
通过文件的路径来创建一个可读文件的流对象：
```javascript
var fs = require('fs');
var rs = fs.createReadStream('/path/to/file');
```
该方法还提供第二个参数，来设置文件的开始、结束位置、编码、文件标志以及``Buffer``大小。这个参数默认值：
```javascript
{
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 0666,
    bufferSize: 64*1024
}
```
创建可写文件的流对象：
```javascript
var fs = require('fs');
var rs = fs.createWriteStream('/path/to/file',options);
```
该方法提供第二个参数，默认值为：
```javascript
{
    flags: 'w',
    encoding: null,
    mode: 0666
}
```
```javascript
var fs = fs.createWriteStream('/path/to/file',{encoding: 'utf8'});
```
###网络流对象 network streams
``Node``的``net``模组中的主要的类都是继承自``stream``，比如``TCP``客户端连接实例也是一个``ReadStream``和``WriteStream``对象，``http``请求实例是一个``ReadStream``，``http``响应实例是一个``WriteStream``。也就是说这些对象或类同时实现并继承了``ReadStream``与``WriteStream``的方法和事件。

###有意思的东西
``Node``不会阻塞``I/O``，因此也就不会阻塞``I/O``的读写操作。当执行写操作时，如果``Node``不将要写的数据刷新到内核空间，这部分数据将会被存储在``Node``进程内。

为了释放进程内的内存，``writeStream``提供了一种机制：在调用``write()``方法时，它会返回一个布尔值，若写入的数据被刷新到内核空间后，返回值为``true``，否则为``false``。

每当``WriteStream``把全部数据刷新到内核缓冲区内，它就会触发事件``drain``：
```javascript
var writeStream = ...;
writeStream.on('drain', function () {
    console.log('write stream drained');
})
```
设想一个场景：向一个``writeStream``(TCP 连接) 输入数据，而这些数据来源于另一个``readStream``文件：
```javascript
require('http').createServer(function (req, res) {
	var rs = require('fs').createReadStream('/path/to/file');
	rs.on('data', function (chunk) {
		res.write(chunk);
	});

	rs.on('end', function () {
		res.end();
	});
});
```
从本地读取文件，``readStream``速度会比较快；网络连接较慢，``writeStream``会比较慢。``readStream``会很快通过``data``事件把数据写到``writeStream``中，但此时``writeStream``还没有将之前的数据发送出去，``Node``就会帮客户端存储数据。每个请求都被缓存到内存中，并且某一个时间段收到了很多并发请求，``Node``的内存就会疯狂的增长，直到引发其他服务器问题。

改进：
```javascript
require('http').createServer(function (req, res) {
	var rs = fs.createReadStream('/path/to/file');
	rs.on('data', function (data) {
		// 返回false,则暂时不能写入内核空间
		if (!res.write(data)) {
			rs.pause();
		}
	});
	res.on('drain', function () {
		rs.resume();
	});
	rs.on('end', function () {
		res.end();
	});
});
```
####Pipe
```javascript
require('http').createServer(function (req, res) {
	var rs = fs.createReadStream('/path/to/file');
	rs.pipe(res);
});
```
``readStream.pipe``的第一个参数必须是一个``writeStream``对象，用来表示数据将会从``readStream``写到``writeStream``中去。

``pipe``方法默认在``ReadStream``读取结束后，会自动调用``WriteStream.prototype.end()``。可以设置第二个参数为``{end: false}``来改变：
```
var fs = require('fs');
require('http').createServer(function (req, res) {
	var rs = fs.createReadStream('/path/to/file');
	rs.pipe(res, {end: false});

	rs.once('end', function () {
		res.end("And that's all folks");
	});
}).listen(4000);
```
