##原型
---

每个函数都有一个``prototype``(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含由特定类型的所有实例共享的属性和方法。

每个原型对象，默认情况下，都会自动获得一个``constructor``(构造函数)属性，这个属性包含一个指向``prototype``属性所在``函数``的指针。

每个实例，内部包含一个指针(内部属性)``[[Prototype]]``，指向构造函数的原型对象。

上面是构造函数，原型，实例 之前的关系，而实例和构造函数之间没有指向关系。

首先来看``Object.prototype``的几个方法：
``hasOwnProperty()``、``propertyIsEnumerable()``、``isPrototypeOf()``、
``valueOf()``、``toString()``
这5种方法经由继承会出现在所有对象中。

``ECMAScript5``增加了一个新方法，``Object.getPrototypeof()``，参数是实例，返回``[[Prototype]]``的值。

关于属性的一些操作：
* ``in``操作符，在给定对象中查找一个给定名称的属性，会检查自有和原型属性
* ``delete``操作符，删除属性
* 属性枚举：``for-in``循环；``ECMAScript5``引入了``Object.keys()``方法，返回可枚举属性的名字的数组，但只返回自有(实例)属性
* 获得所有实例属性，无论是否可枚举，使用``Object.getOwnPropertyNames()``

属性
---

``ECMAScript``中有两种属性：数据属性 和 访问器属性。

数据属性：包含一个数据值的位置，在这个位置可以读取和写入值。
访问器属性：不包含值，而是定义了一个当属性被读取时调用的函数(``getter``)和一个当属性被写入时调用的函数(``setter``)。

**通用特性：**
1. ``[[Configurable]]``：表示能否通过``delete``删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器(数据)属性。
2. ``[[Enumerable]]``：表示能否遍历该属性。

一般像直接在对象上定义的属性，这两个特性默认值为``true``。

**修改属性特性：**
使用``Object.defineProperty()``方法，该方法接受``3``个参数：拥有该属性的对象、属性名和包含需要设置的特性的属性描述符对象。
```javascript
var person = {
  name: 'OriginalSoul'
};

Object.defineProperty(person, 'name', {
  enumerable: false
});

console.log(person.propertyIsEnumerable('name'));  // false


Object.defineProperty(person, 'name', {
  configurable: false
});

delete person.name;
console.log("name" in person);  // true

Object.defineProperty(person, "name", {
  configurable: true
});
// Uncaught TypeError: Cannot redefine property: name
```
一旦把属性定义为不可配置的，就不能再把它变回可配置的了。

**数据属性特性：**
*  ``[[Writable]]``：表示能否修改属性的值，一般默认为``true``。
* ``[[Value]]``：包含这个属性的数据值，默认值为``undefined``。

当用``Object.defineProperty()``定义新的属性时，一定记得为所有的四个特性指定一个值，否则布尔型的特性会默认设置为``false``。

**访问器属性特性：**
* ``[[Get]]``：在读取属性时调用的函数，默认值为``undefined``。
* ``[[Set]]``：在写入属性时调用的函数，默认值为``undefined``。

访问器属性不能直接定义，必须使用``Object.defineProperty()``来定义。
```
var person = {
  _birth: 1990,
  age: 24
};

Object.defineProperty(person, "birth", {
  get: function () {
    return this._birth;
  },
  set: function (newValue) {
    this.age -= (newValue - 1990);
  }
});

person.birth = 1995;
console.log(person.age); // 19
```
下划线 是一种常用的记号，用于表示只能通过对象方法访问的属性。
上面的例子，是使用访问器属性的常见方式，即设置一个属性的值会导致其他属性发生变化。

**定义多个属性：**
``ECMAScript5``的``Object.defineProperties()``为一个对象同时定义多个属性。

两个参数：需要改变的对象 和 一个包含所有属性信息的对象，后者可以被看成一个哈希表，键是属性名，值是为该属性定义特征的属性描述对象。
```
var person = {};

Object.defineProperties(person, {
  _birth: {
    value: 1990,
  },
  age: {
    value: 24,
    writable: true
  },
  birth: {
    get: function () {
      return this._birth;
    },
    set: function (newValue) {
      this.age -= (newValue - 1990)
    }
  }
});

person.birth = 1993;
console.log(person.age);  // 21
```
**获取属性特性：**
``ECMAScript5``的``Object.getOwnPropertyDescriptor()``方法，接受两个参数：对象和属性名。
```
var person = {
  name: 'OriginalSoul'
};

var descriptor = Object.getOwnPropertyDescriptor(person, "name");

console.log(descriptor.enumerable);  //true
console.log(descriptor.writable);    //true
console.log(descriptor.value);       //OriginalSoul
console.log(descriptor.configurable); //true
```

创建对象
---

**简单模式**
* ``Object``构造函数
* 对象字面量

缺点：会产生大量的重复代码。

**工厂模式**
```javascript
function Person(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function () {
    alert(this.name);
  };
  return o;
}
```

```javascript
var person = Person('wyd',18);
```
优点：解决了重复问题。
缺点：没有解决对象识别问题，即怎样知道一个对象的类型。
```javascript
console.log(person instanceof Person);  //false
```

**构造函数模式**
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
        alert(this.name);
    };
}
```
```javascript
// 要创建Person的新实例，必须使用new操作符。
var person = new Person('wyd',18);
```
**优点：**
拥有了``constructor``(构造函数)属性，用来识别对象类型：
```javascript
alert(person.constructor == Person); //true
```javascript
还可以用``instanceof``检测对象类型：
```javascript
alert(person instanceof Object);  //true
alert(person instanceof Person);  //true
```
有了``new``操作符来调用，其实任何函数，只要通过``new``操作符来调用，那它就可以作为构造函数；否则跟普通函数没两样。

**缺点：**
如果构造函数中有 不变的属性 和 方法，那么这些都要在每个实例上重新创建一遍，这样就多占用内存，而且缺乏效率。
```javascript
var person2 = new Person('evilcige',24);
```
```javascript
alert(person.sayName == person2.sayName);  //false
```
如上，可以看到不同实例上的同名函数是不相等的。

如果改变下，把方法变成全局函数拿到外面，那就又毫无封装性可言。

**原型模式**
每一个构造函数都有一个``prototype``属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例所共享。
```javascript
function Person(){
}

Person.prototype.name = "evilcige";
Person.prototype.age = 24;
Person.prototype.job = "Front-end Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
person1.sayName();   //"evilcige"

var person2 = new Person();
person2.sayName();   //"evilcige"

alert(person1.sayName == person2.sayName);  //true
```

在所有实现中都无法访问到``[[Prototype]]``，但可以通过``isPrototypeOf()``方法来确定对象之间是否存在这种关系：
```javascript
alert(Person.prototype.isPrototypeOf(person1));  //true
```
``ECMAScript 5``增加了一个新方法，叫``Object.getPrototypeOf()``，在所有支持的实现中，这个方法返回``[[Prototype]]``的值：
```javascript
alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"evilcige"
```
**优点：**解决了构造函数模式的问题，提高了效率。
**缺点：**
首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。这会在某种程度上带来一些不方便。

其次，原型中所有属性是被很多实例共享的，对于包含引用类型值的属性来说，就有问题了。一个实例如果修改了引用类型的属性，则由于共享性，修改会反映到另一个实例。

**组合使用构造函数模式和原型模式**
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["mhb", "zyf"];
}

Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}
```
重设``constructor``属性会导致它的``[[Enumerable]]``特性被设置为``true``，默认情况下，原生的``constructor``属性是不可枚举的。
```javascript
var person1 = new Person("evilcige", 25, "FE Engineer");
var person2 = new Person("OrigianlSoul", 24, "student");

person1.friends.push("zy");
console.log(person1.friends);    // ["mhb", "zyf", "zy"]
console.log(person2.friends);    // ["mhb", "zyf"]
console.log(person1.friends === person2.friends);    //false
console.log(person1.sayName === person2.sayName);    //true
```
这种构造函数与原型混成的模式，是目前在ECMAScript中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

**寄生构造函数模式**
```javascript
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var friend = new Person("evilcige", 24, "FE Engineer");
friend.sayName();  // "evilcige"
```
这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改``Array``构造函数，因此可以使用这个模式。
```javascript
function SpecialArray(){

    //创建数组
    var values = new Array();

    //添加值
    Array.prototype.push.apply(values, arguments);

    //添加方法
    values.toPipedString = function(){
        return this.join("|");
    };

    //返回数组
    return values;
}

var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString()); // "red|blue|green"
```
返回的对象，与构造函数或者与构造函数的原型属性之间没有关系。


