#事件驱动events
``events``是``Node.js``最重要的模块，没有之一，原因是``Node.js``本身架构就是事件式的，而它提供了唯一的接口，所以堪称``Node.js``事件编程的基石。

``events``模块不仅用于用户代码与``Node.js``下层事件循环的交互，还几乎被所有的模块依赖。

###事件发射器
``events``模块只提供了一个对象：``events.EventEmitter``。``EventEmitter``的核心就是事件发射与事件监听器功能的封装。

常用``api``：
* ``EventEmitter.on(event, listener)``为指定事件注册了一个监听器。
* ``EventEmitter.emit(event, [arg1],[arg2],[..])``发射``event``事件。
* ``EventEmitter.once(event, listener)``为指定事件注册一个单次监听器。
* ``EventEmitter.removeListener(event, listener)``移除指定事件的某个监听器。
* ``EventEmitter.removeAllListeners([event])``移除所有事件的所有监听器，如果指定``event``，则移除指定事件的所有监听器。

```
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('someEvent', function (arg1, arg2) {
	console.log('listener1', arg1, arg2);
});

emitter.on('someEvent', function (arg1, arg2) {
	console.log('listener2', arg1, arg2);
});

emitter.emit('someEvent','evilcige','1990');
```
运行结果：
```
listener1 evilcige 1990
listener2 evilcige 1990
```
``EventEmitter``定义了一个特殊的事件``error``，当它被发射时，如果没有响应的监听器，则会当作异常，退出程序并打印调用栈。
```javascript
emitter.emit('error');
```
###继承 EventEmitter
大多时候我们不会直接使用``EventEmitter``，而是在对象中继承它。包括``fs``、``net``、``http``在内的，只要是支持事件响应的核心模块都是``EventEmitter``的子类。

```
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var MyClass = function (opt1, opt2) {
	this.opt1 = opt1;
	this.opt2 = opt2;
}
// 继承
util.inherits(MyClass, EventEmitter);

MyClass.prototype.someMethod = function () {
	this.emit('a event', 'some arguments');
}

var myInstance = new MyClass(1, 2);
myInstance.on('a event', function () {
	console.log('got a event!');
});

myInstance.someMethod();
```