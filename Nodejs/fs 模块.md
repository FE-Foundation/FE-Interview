#fs 模块
文件的所有操作都有异步和同步，同步带``Sync``。
```javascript
var fs = require('fs');
```
####path内置模块
* ``path.normalize``将传入的路径转换为标准路径
* ``path.join``将传入的多个路径拼接为标准路径
* ``path.extname('foo/bar.js'); // => ".js"``

####fs.stat
查询文件的信息：
```javascript
fs.stat(__dirname+'/test', function (err, stats) {
	if (err) {
		throw err;
	}
	console.log(stats);
	console.log(stats.isDirectory()); //true
})
```
``stats``是``Stats``的实例，通过它可以调用：
* ``stats.isFile()``
* ``stats.isDirectory()``等

####实现文件拷贝
与``copy``命令类似，我们的程序需要能接受源文件路径与目标文件路径两个参数。
```
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```
``process``是一个全局变量，可通过``process.argv``获得命令行参数。由于``argv[0]``固定等于``NodeJS``执行程序的绝对路径，``argv[1]``固定等于主模块的绝对路径，因此第一个命令行参数从``argv[2]``这个位置开始。

####读取文件内容 fs.readFile
```
fs.readFile('test.txt', function (err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});
```
运行结果：
```
<Buffer 48 56 6c 6c 6f 2c 57 6f 72 6c 64 21>
```
改成：
```javascript
fs.readFile('test.txt','utf-8', function (err, data) {...});
```
运行结果：``Hello,World!``

常用``api``：
``fs.readFile(filename, [encoding],[callback(err,data}])``
``fs.writeFile(filename, data, [encoding], [callback(err)])``
``fs.unlink(path, [callback(err)])``
``fs.mkdir(path, [mode],[callback(err)])``
``fs.rmdir(path, [callback(err)])``
``fs.readdir(path, [callback(err, files)])``
```javascript
fs.rename('test','newTest', function (err) {
	console.log(err);
})
```

####更底层的操作
``fs.open(path, flags, [mode], [callback(err,fd)])``

``flags`` 可以是：
* ``r``：以读取模式打开文本文件，并且自文件开头开始读取数据
* ``r+``：以读写模式打开文件，并且自文件开头开始读取数据和写入数据
* ``w``：以写入模式打开文件，删除文本文件使其数据长度为0 或 新建文本文件自开头开始写入数据
* ``w+``：以读写模式打开文件，并且自文件开头开始读取数据或写入数据。如果文件不存在，则新建。如果存在，则先删除该文件。
* ``a``：以追加模式打开文件，并且自文件末尾写入数据。文件不存在则新建
* ``a+``：以读取追加模式打开文件，读取文件并且自文件末尾写入数据。文件不存在则新建

在回调函数中得到``fd``，这是一个整数，代表打开文件的描述符。可用它作为处理器来读取文件和写入数据。

``fs.close(fd, [callback(err)])``

``fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])`` 
``fs.read``的功能是从指定的文件描述符 ``fd`` 中读取数据并写入 ``buffer`` 指向的缓冲区对象。 
``offset`` 是``buffer`` 的写入偏移量。 ``length``是要从文件中读取的字节数。 ``position`` 是文件读取的起始位置，如果 ``position`` 的值为``null``，则会从当前文件指针的位置读取。回调函数传递``bytesRead`` 和`` buffer``，分别表示读取的字节数和缓冲区对象。

``fs.write(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])`` 

####遍历
深度优先搜索：
```
var fs = require('fs');
var path = require('path');

function travel(dir, callback) {
	fs.readdirSync(dir).forEach(function (file) {
		var pathname = path.join(dir, file);

		if (fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		} else {
			callback(pathname);
		}
	});
}

travel(__dirname+'/home/user', function (pathname) {
	console.log(pathname);
});
```
广度优先搜索：
```
function travel(dir, callback) {
	var dirList = fs.readdirSync(dir);
	dirList.forEach(function (file) {
		var pathname = path.join(dir, file);
		if (fs.statSync(pathname).isFile()) {
			callback(pathname);
		} 
	});

	dirList.forEach(function (file) {
		var pathname = path.join(dir, file);
		if (fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		}
	});
}
```
