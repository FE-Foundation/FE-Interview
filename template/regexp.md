**创建**
```
var re = / pattern / flags;
var re = new RegExp("pattern", "flags");
```
``flags``: ``g``全局，``i``忽略大小写， ``m``多行。

---
**特殊字符**
* ``\``：转义
* ``^``：匹配输入的开始，如果多行标示被设置为true,同时匹配换行后紧跟的字符。
* ``$``：匹配输入的结束，如果多行标示被设置为true,同时会匹配换行前紧跟的字符。
* ``*``：匹配前一个字符``0``次或者是多次。
* ``+``：匹配前面一个字符``1``次或者多次。
* ``?``：匹配前面一个字符``0``次或者``1``次。
* ``.``：匹配任何除了新一行开头字符的任何单个字符。
* ``x|y``：匹配‘x’或者‘y’。
* ``{n}``：n是一个正整数，匹配了前面一个字符刚好发生了n次。
* ``{n,m}``：n 和 m 都是正整数。匹配前面的字符至少n次，最多m次。如果 n 或者 m 的值是0， 这个值被忽略。

* ``[xyz]``：一个字符集合。匹配方括号的中任意字符。可以使用破折号（-）来指定一个字符范围。对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转意，不过转意也是起作用的。
* ``[^xyz]``：一个反向字符集。

* ``\b``：匹配一个词的边界。
* ``\d``：匹配一个数字。
* ``\D``：匹配一个非数字字符。
* ``\s``： 匹配一个空白字符，包括空格、制表符、换页符和换行符。
* ``\S``： 匹配一个非空白字符。

* ``\1``：指向分组1所捕获到的文本的一个引用，同理``\2,\3``。

---
**分组：**
* 捕获型``(x)``：匹配``‘x’``并且记住匹配项。匹配到子字符串可以通过结果数组的``[1],...,[n]``元素进行访问。
* 非捕获型``(?:x)``：匹配``'x'``但是不记住匹配项。
* 向前正向匹配``x(?=y)``：匹配``'x'``仅仅当``'x'``后面跟着``'y'``。
* 向后负向匹配``x(?!y)``：匹配``'x'``仅仅当``'x'``后面不跟着``'y'``。

---
**``RegExp``对象的属性**
``global``，``ignoreCase``，``lastIndex``，``multiline``，``source``。

**方法**：
``regexObj.exec(str)`` 方法为指定的一段字符串执行搜索匹配操作。它的返回值是一个数组或者 ``null``。
返回的数组包括匹配的字符串作为第一个元素，紧接着一个元素对应一个成功匹配被捕获的字符串的捕获括号。
```
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```
```
result[0];  // 匹配的全部字符串 "Quick Brown Fox Jumps"

// [1], ...[n]    括号中的分组捕获
result[1]   // "Brown"
result[2]   // "Jumps"

result.index  // (匹配到的字符位于原始字符串的基于0的索引值) 4
result.input  // 原始字符串 "The Quick Brown Fox Jumps Over The Lazy Dog"

re.lastIndex  // 下一次匹配开始的位置 25
```

``regexObj.test(str)``：一个在字符串中测试是否匹配的RegExp方法，它返回true或false。

``str.search(regexp)``：匹配到则返回第一个匹配的首字符位置，没有返回－1。
``str.split([separator[, limit]])``：分割，limit限制被分割的片段数。返回一个字符串数组。

``str.match(regexp)``：
如果``regexp``带有``g``标识，那么生成一个包含所有匹配（除捕获分组之外）的数组，否则，与调用``exec``结果相同。
```
var str = 'For more information, see Chapter 3.4.5.1';

var re = /(chapter \d+(\.\d)*)/i;
var found = str.match(re);
console.log(found);
/*["Chapter 3.4.5.1", "Chapter 3.4.5.1", ".1", index: 26, input: "For more information, see Chapter 3.4.5.1"]*/


var re = /(chapter \d+(\.\d)*)/ig;
var found = str.match(re);

console.log(found); // ["Chapter 3.4.5.1"]
```

一个很重要的方法``string.replace``:``https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace``


---

```
var parseUrl = /^(?:([a-zA-Z]+):)?\/{2}([0-9a-zA-Z.\-]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.originalsoul.ga:80/articles?q#fragment";

var result = parseUrl.exec(url);

console.log(result);
```

```
["http://www.originalsoul.ga:80/articles?q#fragment", "http", "www.originalsoul.ga", "80", "articles", "q", "fragment"]
```
