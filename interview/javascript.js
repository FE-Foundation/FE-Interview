**数组深度去重**
给定一个随机数组，数组可能包含数组（也就是说数组元素可能为数组）。要求用js实现一个函数，返回该数组中所有元素，重复的要求去掉。例如：
数组[2,3,[4,6,[3,8]],12,10]，返回结果为：[2,3,4,6,8,12,10]。

```
function getUniEle (array) {
  var result = [],
    temp;

  var process = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      temp = arr[i];
      if (typeof temp == 'number' && result.indexOf(temp) == -1) {
        result.push(temp);
      } else if (Object.prototype.toString.apply(temp) == '[object Array]') {
        console.log(temp);
        process(temp);
      }
    }
  };

  process(array);
  return result;
}

var arr = [2,3,[4,6,[3,8]],12,10];
console.log(getUniEle(arr));
```

**解析 url**
给定一个URL字符串，要求用js实现一个函数，返回该URL的域名、请求路径、参数和hash值、
例如：``URL：http://www.qunar.com/plane/queryPlane.html?startTime=xxxx&endTime=xxxxx#tags``
返回结果为：
```
{
    host: "www.qunar.com",
    path: "plane/queryPlane.html",
    query: {
        "startTime": "xxxxx",
        "endTime": "xxxxx"
    },
    hash: "tags"
}
```
注明：xxxx为url编码后的字符串，设计函数是肯定要求把它解码过来！

```
function parseUrl (url) {
    var ele = document.createElement('a');
    ele.href = url;

    var result = {
        host: ele.host,
        path: ele.pathname,
        query: parseSearch(ele.search),
        hash: ele.hash
    }

    return result;
}

function parseSearch (search) {
    var qs = (search.length > 0 ? search.substring(1) : ""),
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        result = {};

    for (var i = 0; i < items.length; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            result[name] = value;
        }
    }
    return result;
}

var url = "http://www.qunar.com/plane/queryPlane.html?startTime=xxxx&endTime=xxxxx#tags";
console.log(parseUrl(url));
```
有一个数组，由不重复的``100``个字符串组成，随即取``50``个不重复的字符串。
```
function random50 (arr) {
  var index,
    temp;

  for (var i = 0; i < 50; i++) {
    index = Math.floor(Math.random() * (99 - i));

    temp = arr[index];
    arr[index] = arr[99 - i];
    arr[99 - i] = temp;
  }

  return arr.slice(-50);
}
```

数组去重
```
function getUniArr (arr) {
  var result = [],
    obj = {},
    temp;

  for (var i = 0; i < arr.length; i++) {
    temp = arr[i];

    if (!obj[temp]) {
      result.push(temp);
      obj[temp] = 1;
    }
  }
  return result;
}
```
将两个js字符串数组合并，并取出合并后数组里的重复元素
```
function getRepeat (arr1, arr2) {
  var tempArr = arr1.concat(arr2),
    result = [],
    obj = {},
    temp;

  for (var i = 0; i < tempArr.length; i++) {
    temp = tempArr[i];

    if (obj[temp] === 1) {
      result.push(temp);
      obj[temp]++;
    } else {
      obj[temp] || (obj[temp] = 1);
    }
  }

  return result;
}
```
构造一个包含20个整数（介于20和100之间）的数组，然后将他们排序。
```
function build20 () {
  var result = [],
    temp;

  for (var i = 0; i < 20; i++) {
    temp = 20 + Math.floor(Math.random() * 80);
    result.push(temp);
  }
  result.sort();

  return result;

}
```