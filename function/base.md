###调用
JavaScript中有四种调用方式：
1. 方法模式: this到对象的绑定
2. 函数调用模式:  this绑定到全局对象
3. 构造器调用模式: new调用，this绑定到新对象。如果new,且返回值不是一个对象，则返回this(该新对象)。
4. apply调用模式

###扩充类型功能
```javascript
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};
```
给字符串一个移除首位空白的方法：
```
String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

console.log("    test    ".trim());
```
类库没有方法时，才添加：
```
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};
```

###递归
```javascript
var walk_the_Dom = function walk (node, func) {
  func(node);
  node = node.firstChild;

  while(node) {
    walk(node, func);
    node = node.nextSibling;
  }
}

var getElementsByAttribute = function (att, value) {
  var results = [];

  walk_the_DOM(document.body, function (node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);

    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });
};
```
###bind
```javascript
Function.prototype.bind = function (context) {
  var self = this;

  return function () {
    return self.apply(context, arguments);
  };
};

var obj = {
  name: 'OriginalSoul'
};

var func = function () {
  alert(this.name);
}.bind(obj);

func();
```

###柯里化
柯里化允许把函数与传递给他的参数结合，产生一个新的函数。
```javascript
Function.method('curry', function () {
  var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;

  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});
```

###记忆
函数可以讲先前的操作的结果纪录在某个对象里，从而避免无谓的重复运算。
```javascript
var fibonacci = function (n) {
  return n < 2 ? n: fibonacci(n-1) + fibonacci(n-2);
};
```
上面的函数要做很多无谓的工作，函数要被调用很多次。

可以用一个数组``memo``保存我们的存储结果：
```javascript
var fibonacci = function () {
  var memo = [0,1];

  return function fib (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n-1) + fib(n-2);
      memo[n] = result;
    }
    return result;
  };
}();
```
将记忆推广，编写一个函数``memoizer``来帮助构造带记忆功能的函数。
```javascript
var memoizer = function (memo, formula) {
  var recur = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };

  return recur;
};
```
应用：
```javascript
var fibonacci = memoizer([0, 1], function (recur, n) {
  return recur(n-1) + recur(n-2);
});

var factorial = memoizer([1, 1], function (recur, n) {
  return n * recur(n-1);
});
```

### 惰性加载
在第一次进入函数的条件分支之后，在函数内部会重写这个函数，重写之后的函数就是我们所希望的，下次进入函数时就没有了分支语句。
```javascript
var addEvent = function (ele, type, handler) {
  if (window.addEventListener) {
    addEvent = function (ele, type, handler) {
      ele.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function (ele, type, handler) {
      ele.attachEvent('on'+type, hanlder);
    };
  }

  addEvent(ele, type, handler);
}
```