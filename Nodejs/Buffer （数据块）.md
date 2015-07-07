####Buffer （数据块）
``JS``语言自身只有字符串数据类型，没有二进制数据类型，因此``NodeJS``提供了一个与``String``对等的全局构造函数``Buffer``来提供对二进制数据的操作。除了可以读取文件得到``Buffer``的实例外，还能够直接构造，例如：
```javascript
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
```
``Buffer``与字符串类似，除了可以用``.length``属性得到字节长度外，还可以用``[index]``方式读取指定位置的字节，例如：
```
bin[0]; // => 0x68;
```
``Buffer``与字符串能够互相转化，例如可以使用指定编码将二进制数据转化为字符串：
```
var str = bin.toString('utf-8'); // => "hello"
```
或者反过来，将字符串转换为指定编码下的二进制数据：
```
var bin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
```
``Buffer``与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于``Buffer``，更像是可以做指针操作的``C``语言数组。例如，可以用``[index]``方式直接修改某个位置的字节。
```
bin[0] = 0x48;
```
而``.slice``方法也不是返回一个新的``Buffer``，而更像是返回了指向原``Buffer``中间的某个位置的指针，如下所示。
```
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
```
因此对``.slice``方法返回的``Buffer``的修改会作用于原``Buffer``，例如：
```javascript
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);  //可以两个参数

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>
```
也因此，如果想要拷贝一份``Buffer``，得首先创建一个新的``Buffer``，并通过``.copy``方法把原``Buffer``中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。
```
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
```
```
var bin = new Buffer("this is the string in my buffer");
var dup = new Buffer(10);

var targetStart = 0,
	sourceStart = 10,
	sourceEnd = 20;

bin.copy(dup, targetStart, sourceStart, sourceEnd);
```
总之，``Buffer``将``JS``的数据处理能力从字符串扩展到了任意二进制数据。