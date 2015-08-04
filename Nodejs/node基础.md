NodeJS基础
----------------------

### 模块

编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。

在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

#### require

`require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以`./`开头），或者是绝对路径（以`/`或`C:`之类的盘符开头）。另外，模块名中的`.js`扩展名可以省略。

另外，可以使用以下方式加载和使用一个JSON文件。

	var data = require('./data.json');

#### exports

`exports`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。以下例子中导出了一个公有方法。

	exports.hello = function () {
		console.log('Hello World!');
	};

#### module
``exports``其实就是对``module.exports``的引用，默认情况下是一个对象。如果在该对象上逐个添加属性无法满足你的需求，可以彻底重写``module.exports``。

通过`module`对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

	module.exports = function () {
		console.log('Hello World!');
	};

以上代码中，模块默认导出对象被替换为一个函数。

#### 模块初始化

一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

#### 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，`main.js`就是主模块。

	$ node main.js


例如有以下目录。

	- /home/user/hello/
		- util/
			counter.js
		main.js

其中`counter.js`内容如下：

	var i = 0;

	function count() {
		return ++i;
	}

	exports.count = count;

该模块内部定义了一个私有变量`i`，并在`exports`对象导出了一个公有方法`count`。

主模块`main.js`内容如下：

	var counter1 = require('./util/counter');
	var	counter2 = require('./util/counter');

	console.log(counter1.count());
	console.log(counter2.count());
	console.log(counter2.count());

运行该程序的结果如下：

	$ node main.js
	1
	2
	3

可以看到，`counter.js`并没有因为被require了两次而初始化两次。

### 二进制模块

虽然一般我们使用JS编写模块，但NodeJS也支持使用C/C++编写二进制模块。编译好的二进制模块除了文件扩展名是`.node`外，和JS模块的使用方式相同。虽然二进制模块能使用操作系统提供的所有功能，拥有无限的潜能，但对于前端同学而言编写过于困难，并且难以跨平台使用。

除非JS模块不能满足需求，否则不要轻易使用二进制模块。

### 包（package）
JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，我们可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。

在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。在其它模块里使用包的时候，需要加载包的入口模块。

* 当模块的文件名是``index.js``，加载模块时可以使用模块所在目录的路径代替模块文件路径；
* 如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个package.json文件，并在其中指定入口模块的路径。
```
{
    "name": "",
    "main": "./lib/main.js"
}
```
###命令行程序
* 首先在js文件顶部增加一行注释，表明当前脚本使用NodeJS解析：``#! /usr/bin/env node``
* 赋予js文件执行权限：``$ chmod +x /home/user/bin/xxx.js``
* 最后，我们在PATH环境变量中指定的某个目录下，例如在/usr/local/bin下边创建一个软链文件，文件名与我们希望使用的终端命令同名，命令如下：``$ sudo ln -s /home/user/bin/xxx.js /usr/local/bin/xxx``



