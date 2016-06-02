##继承
---

**原型链**
首先，要清楚构造函数、原型、和实例的关系。

基本思想就是，让``原型对象``等于 另一个引用类型的``实例``，此时的原型对象将包含一个指向另一个原型的指针。

假如另一个原型又是另一个类型的实例，层层递进，就构成了所谓的``原型链``。

```javascript
function Animal () {
  this.type = "动物";
}
Animal.prototype.getType = function () {
  return this.type;
}

function Dog () {
  this.ownType = "狗";
}

// 继承了 Animal
Dog.prototype = new Animal();

Dog.prototype.getOwnType = function () {
  return this.ownType;
}

var dog = new Dog();
console.log(dog.getType());     //动物
console.log(dog.getOwnType());  //狗
```
这里要注意的是：
```javascript
console.log(Dog.prototype.constructor == Animal); //true
```
因为``Dog.prototype``是``Animal``的实例，没有``constructor``，只能通过搜索找到``Animal.prototype``的。
所以往往要，改一下：
```javascript
Dog.prototype.constructor = Dog;
```

**原型链的问题：**
包含引用类型值的原型属性会被所有实例共享；而这也正是为什么要在构造函数中，而不是在原型对象中定义属性的原因。
在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了。
```javascript
function Animal () {
  this.colors = ['black','white','yellow'];
}
function Cat () {
}
Cat.prototype = new Animal();

var cat1 = new Cat(),
  cat2 = new Cat();

cat1.colors.push('silver');
console.log(cat2.colors); //  ["black", "white", "yellow", "silver"]
```

**借用构造函数（constructor stealing）**
基本思想是：在子类型构造函数的内部调用超类型构造函数。
```javascript
function Animal (name, type) {
  this.name = name;
  this.type = type;
  this.colors = ['black','white','yellow'];
}

function Cat () {
  //继承了Animal，同时传递参数
  Animal.apply(this,arguments);
    //或者： Animal.call(this,arguments[0],arguments[1]);
}

var cat1 = new Cat("小花","英短"),
  cat2 = new Cat("小白","波斯猫");

cat1.colors.push('silver');
console.log(cat2.colors);  //["black", "white", "yellow"]

console.log(cat1.type);  //英短
console.log(cat2.name);  //小白
```
这样，就解决了上面原型链的两个问题，但是又有新问题了：
1. 方法都在构造函数中定义，因此函数复用就无从谈起了。
2. 在``超类型的原型``中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。

**组合继承（combination inheritance）**
基本思想是：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
```javascript
function Animal (type) {
  this.type = type;
}
Animal.prototype.getType = function () {
  return this.type;
}

function Cat () {
  //继承属性
  Animal.apply(this,arguments);
}
//继承方法
Cat.prototype = new Animal();

var cat = new Cat('英短');
console.log(cat.getType());  //英短
```
组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为``JavaScript``中最常用的继承模式。

***

**只继承于原型**
出于效率问题，应尽可能将一些可重用的属性和方法添加到原型中去（``new Animal()``方式会将``Animal``的属性设定为对象自身的属性，因而不可重用，因而设置在原型中），不要单独为继承关系创建新对象，尽量减少运行时方法和属性搜索。这样形成习惯，仅仅依靠原型就能完成继承关系了。
```javascript
function Animal () {
}
Animal.prototype.type = "动物";
Animal.prototype.getType = function () {
  return this.type;
}

function Cat () {
}
//继承方法
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;

var cat = new Cat();
console.log(cat.getType());  //动物
```
但是又有新问题出现：
```javascript
console.log(Animal.prototype.constructor);  //指向 Cat
```
因为``Cat.prototype``和``Animal.prototype``是同一个对象。所以子对象的修改会影响父对象。

**原型属性拷贝法**
换一种思路，尝试与之前略有不同的方法。可以简单地将父对象的属性拷给子对象：
```javascript
function extend (Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
}
```
这个方法的效率比上面的要低，因为这里执行的是子对象原型的逐一拷贝，而不是简单地原型链查询。这种方式只适合包含基本数据类型的对象，所有的引用类型(包括函数和数组)都是不可复制的，因为它们只支持引用传递。

其实这种效率低，未必是真的如此糟糕，因为此方法能使属性查找更多地停留在对象本身，从而减少了原型链上的查找。


**原型式继承**
道格拉斯·克罗克福德介绍了一种实现继承的方法，这种方法并没有使用严格意义上的构造函数。他的想法是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。为了达到这个目的，他给出了如下函数：
```javascript
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```
从本质上讲，object()对传入其中的对象执行了一次浅复制:
```javascript
var Animal = {
  type: 'animal',
  color: ['white','black']
}

var Dog = object(Animal);
Dog.color.push('yellow');

console.log(Animal.color);   // ["white", "black", "yellow"]
```
在继承现有对象时，往往希望再为其添加额外的方法与属性，对此可以通过一个函数调用来完成：
* 使用原型继承的方式克隆(``clone``)现存对象。
* 而对其他对象使用属性拷贝(``copy``)的方式。

```javascript
function objectPlus(o, stuff){
  var n;
    function F(){}
    F.prototype = o;
    n = new F();
    n.uber = o;

    for (var i in stuff) {
      n[i] = stuff[i];
    }
    return n;
}
```
```javascript
var Animal = {
  type: 'animal',
  color: ['white','black']
}

var Dog = objectPlus(Animal, {
  name: '小黄'
});
Dog.color.push('yellow');

console.log(Animal.color);   // ["white", "black", "yellow"]
console.log(Dog.name);    // 小黄
```

``ECMAScript 5``通过新增``Object.create()``方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。

在传入一个参数的情况下，``Object.create()``与``object()``方法的行为相同。

第二个参数与``Object.defineProperties()``方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的。以这种方式指定的任何属性都会覆盖原型对象上的同名属性。例如：
```javascript
var Animal = {
    type: 'animal',
    color: ['white','black']
}

var Dog = Object.create(Animal, {
    name:  {
        value: '小黄'
    }
});
Dog.color.push('yellow');

console.log(Animal.color);   // ["white", "black", "yellow"]
console.log(Dog.name);    // 小黄
```
支持``Object.create()``方法的浏览器有``IE9+、Firefox 4+、Safari 5+、Opera 12+``和``Chrome``。

**寄生组合式 | 临时构造器法**
前面说过，组合继承是``JavaScript``最常用的继承模式；不过，它也有自己的不足。组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：
一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。
```javascript
function SubType(){
    SuperType.call(this, arguments);    //第二次调用SuperType()
}

SubType.prototype = new SuperType();    //第一次调用SuperType()
```
针对以上问题，新的继承方法如下：
```javascript
function inherit (subType, superType) {
  var F = function () {};
  F.prototype = superType.prototype;
  subType.prototype = new F();
  subType.prototype.constructor = subType;
}
```
```javascript
function Animal (type) {
  this.type = type;
}
Animal.prototype.getType = function () {
  return this.type;
}

function Cat () {
  Animal.apply(this, arguments);
}

inherit(Cat, Animal);

var cat = new Cat("cat");
console.log(cat.getType());  // cat
```

> 看过这些，其实还是很喜欢老道的那个方法，也就是``es5``的``Object.create``。继承一般就是考虑属性和方法，而属性要避免引用的坑。方法尽量做到共用。这样我们可以把带有共用方法的参数对象作为第一个参数，把需要不同值的属性放在一个对象中，作为第二个参数。