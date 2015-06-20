## CSS选择器

####基本选择器
1. **``*``通用选择器**：选择所有元素，**不参与计算优先级**，兼容性IE6+
2. **``#X`` id选择器**：选择id值为X的元素，兼容性：IE6+
3. **``.X`` 类选择器**： 选择class包含X的元素，兼容性：IE6+
4. **``X Y``后代选择器**： 选择满足X选择器的后代节点中满足Y选择器的元素，兼容性：IE6+
5. **``X`` 元素选择器**： 选择标所有签为X的元素，兼容性：IE6+
6. **``X > Y``子选择器**： 选择X的子元素中满足Y选择器的元素，兼容性： IE7+
7. **``X + Y``直接兄弟选择器**：在**X之后第一个兄弟节点**(紧邻)中选择满足Y选择器的元素，兼容性： IE7+
8. **``X ~ Y``兄弟**： 选择**X之后所有兄弟节点**中满足Y选择器的元素，兼容性： IE7+


####属性选择器：
1. **``ele[attr]``**：选择所有设置了attr属性的元素，兼容性：IE7+
2. **``ele[attr="value"]``**：选择属性值刚好为value的元素，兼容性：IE7+
3. **``ele[attr~="value"]``**：选择属性值为空白符分隔，其中一个的值刚好是value的元素，兼容性：IE7+
4. **``ele[attr|="value"]``**：选择属性值刚好为value或者value开头的元素，兼容性：IE7+
5. **``ele[attr^="value"]``**：选择属性值以value开头的元素，兼容性：IE7+
6. **``ele[attr$="value"]``**：选择属性值以value结尾的元素，兼容性：IE7+
7. **``ele[attr*="value"]``**：选择属性值中包含value的元素，兼容性：IE7+
8. **``ele[:checked]``**：选择单选框，复选框，下拉框中选中状态下的元素，兼容性：IE9+

####伪类选择器：
链接伪类：
**a:link，a:visited，a:focus，a:hover，a:active 链接状态**： 选择特定状态的链接元素，顺序``LoVe HAte``，兼容性: IE4+

动态伪类(可应用所有元素)：
**:hover**：鼠标移入状态的元素，兼容性a标签IE4+， 所有元素IE7+

结构化伪类：
* **``X:first-child``**：伪类，选择满足X选择器的元素，且这个元素是其父节点的第一个子元素。兼容性IE7+
* **``X:last-child``**：伪类，选择满足X选择器的元素，且这个元素是其父节点的最后一个子元素。兼容性IE9+
* **``X:only-child``**：伪类，选择满足X选择器的元素，且这个元素是其父元素的唯一子元素。兼容性IE9+
* **``li:nth-child(an + b)``**：伪类，选择前面有``an + b - 1``个兄弟节点的元素，其中n&gt;= 0，可为odd或even， 兼容性IE9+

``:only-of-type``：IE9+
``:first-of-type``： IE9+
``:last-of-type``： IE9+
``:nth-of-type(even)``： IE9+
``:nth-last-of-type(2n)``： IE9+
> NOTE：element:nth-of-type(n) 指父元素下第 n 个 element 元素，element:nth-child(n) 指父元素下第 n 个元素且元素为 element，若不是，选择失败。具体细节请在使用时查找文档。

其他：
``:enabled``、``:disabled``、``checked``
**``:not(selector)``**：选择不符合selector的元素。**不参与计算优先级**，兼容性：IE9+

####伪元素选择器：
之前是``:``，CSS3中``::``表示伪元素。

**``::first-letter``**：伪元素，选择块元素第一行的第一个字母，兼容性IE6+
**``::first-line``**：伪元素，选择块元素的第一行，兼容性IE6+
**``X:after, X::after``**：在特定元素前面或后面添加特殊内容``content``，并设置样式。兼容性:after为IE8+，::after为IE9+
**``::selection``：被用户选中的内容（鼠标选择高亮属性）IE9+ Firefox需用 -moz 前缀


####特殊性
如果一个元素有连个或多个冲突的属性声明，那么有最高特殊性的声明就会胜出。

特殊性值表述为4个部分，如：``0,0,0,0``：
* 选择器中有一个 ``ID属性值``，加 ``0,1,0,0``；
* 选择器中有一个``class类属性值``、``属性选择``或``伪类``，加``0,0,1,0``；
* 选择器中有一个元素名或伪元素，加``0,0,0,1``；
* 结合符和通配选择器对特殊性没有贡献。
* 最高级是：行内样式

```css
html>body table tr[id="totals"] td ul>li {} /*0,0,1,7*/
```


##"display"属性
值：``block``、``inline``、``none``、``inline-block``、``flex``等等


#### `display: none;`与`visibility: hidden;`的区别
联系：它们都能让元素不可见

区别：

1. display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
2. display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
3. 修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
4. 读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容

#### ``display: block;``和``display: inline;``的区别

``block``元素特点：  

1.处于常规流中时，如果``width``没有设置，会自动填充满父容器  
2.可以应用``margin/padding``  
3.在没有设置高度的情况下会扩展高度以包含常规流中的子元素  
4.处于常规流中时布局时在前后元素位置之间（独占一个水平空间）  
5.忽略``vertical-align``  

``inline``元素特点  

1.水平方向上根据``direction``依次布局  
2.不会在元素前后进行换行  
3.受``white-space``控制  
4.**``margin/padding``在竖直方向上无效，水平方向上有效**  
5.**``width/height``属性对非替换行内元素无效，宽度由元素内容决定**  
6.非替换行内元素的行框高由``line-height``确定，替换行内元素的行框高由``height``,``margin``,``padding``,``border``决定  
6.浮动或绝对定位时会转换为``block``  
7.``vertical-align``属性生效  

##"position"属性
值：
``static``(默认)：一个 static 元素表示它不会被“positioned”，一个 position 属性被设置为其他值的元素表示它会被“positioned”。

``relative``：在一个相对定位（position属性的值为relative）的元素上设置 top 、 right 、 bottom 和 left 属性会使其偏离其正常位置。其他的元素则不会调整位置来弥补它偏离后剩下的空隙。包含块为最近的块级祖先元素。

``fixed``：一个固定定位（position属性的值为fixed）元素会相对于视窗来定位，这意味着即便页面滚动，它还是会停留在相同的位置。但一个固定定位元素不会保留它原本在页面应有的空隙。

``absolute``：相对于最近的“positioned”祖先元素。如果绝对定位（position属性的值为absolute）的元素没有“positioned”祖先元素，那么它是相对于文档的 body 元素，并且它会随着页面滚动而移动。


####position 为 relative 时，一些特殊性
1. 如果 top 和 bottom 都是 auto，则它们的计算值是0；同理right和left。
2. 如果 top 和 bottom 其中一个为 auto，则 auto 相当于另一个的负值；同理right和left。
3. 如果 top 和 bottom 的值都不为 auto，则忽略 bottom；同理忽略 right。

所以想让 right 和 bottom 起作用，就得让 left 和 top 为 auto。



##浮动
浮动元素，会从文档的正常流中删除，不过还是会影响布局。这种影响源于这样一个事实：一个元素浮动时，其他内容会 "环绕" 该元素。但是浮动元素周围的外边距不会合并。

如果要浮动一个非替换元素，必须为该元素声明一个``width``。否则，根据css规定，元素的宽度趋于``0``。

浮动元素的包含块是其最近的**块级祖先元素**。

浮动元素的顶端不能比之前所有浮动元素或块级元素的顶端更高。

浮动元素：尽可能高、尽可能远。

####清除浮动（clearfix hack）& 围住(包含)浮动
1. 为父元素设置``overflow:hidden``或``overflow:auto``。
2. 同时浮动父元素
3. 使用``:after``伪元素（推荐使用）
```css
 .clearfix:after {
    content: "."; 
    display: block; 
    height: 0; 
    visibility: hidden; 
    clear: both; 
 }
```
####浮动元素与正常流中的内容发生重叠

* 行内框与一个浮动元素重叠时，其边框、背景和内容都在该浮动元素"之上"显示。
* 块框与一个浮动元素重叠时，其边框和背景在该浮动元素"之下"显示，而内容在浮动元素"之上"显示。



##盒模型
####auto (块元素)
块级元素水平方向，只有``width``、``margin-left``或``margin-right``可设为auto：
* 三者中只有一个值为``auto``，另两个为特定值，那么设为``auto``的属性会取所需长度，使元素框的宽度等于父元素的width;
* 三者都为非auto的某个值，此时总会把``margin-right``强制为auto;
* 如果两个外边距都为auto，则会设置相等的长度，使元素在其父元素中居中。
* 如果将某个外边距以及width设置为auto，设置为auto的外边距会减为0;
* 如果三者都为auto，则两个外边距会设为0，width尽可能宽。(和默认情况一样);

垂直方向，只有``margin-top``、``margin-bottom``和``height``可设置为auto。
``margin-top``或``margin-bottom``设为auto，会自动计算为 0。

#### 外边距折叠(collapsing margins)
毗邻的两个或多个``margin``会合并成一个margin，叫做外边距折叠。规则如下：  

1. 两个或多个毗邻的普通流中的块元素垂直方向上的margin会折叠  
2. 浮动元素/inline-block元素/绝对定位元素的margin不会和垂直方向上的其他元素的margin折叠
3. 创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠
4. 元素自身的margin-bottom和margin-top相邻时也会折叠


####box-sizing
当你设置一个元素为 ``box-sizing: border-box;``时，此元素的内边距和边框不再会增加它的宽度。

---

---
### CSS有哪些继承属性

- 关于文字排版的属性如：`font`, `word-break`, `letter-spacing`,`text-align`,`text-rendering`,`word-spacing`,`white-spacing`,`text-indent`,`text-transform`,`text-shadow`
- `line-height`
- `color`
- `visibility`
- `list-style`

非继承属性：``background``、``border``、``position``

### `link`与`@import`的区别

1. ``link``是HTML方式， ``@import``是CSS方式
2. ``link``最大限度支持并行下载，``@import``过多嵌套导致串行下载，出现[FOUC](http://www.bluerobot.com/web/css/fouc.asp/)
4. ``link``可以通过``rel="alternate stylesheet"``指定候选样式
5. 浏览器对``link``支持早于``@import``，可以使用``@import``对老浏览器隐藏样式
6. ``@import``必须在样式规则之前，可以在css文件中引用其他文件
6. 总体来说：**[link优于@import](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/)**  


###font 属性

``font``属性，它是涵盖所有其他字体属性的一个简写属性。
例：
```
h1 { 
	font-family: Verdana, Helvetica, Arial, sans-serif;
	font-size: 30px;
	font-weight: 900;
	font-style: italic;
	font-variant: small-caps;
}
```
可以简写为：
```
h1 {
	font: italic 900 small-caps 30px Verdana,Helvetica,Arial,sans-serif;
}
```
前三个值是：``font-style``、``font-weight``、``font-variant``，这三个属性值可以按任何顺序来写，如果其中某个属性的值为``normal``，则可忽略。

``font-size``和``font-family``不仅要以此作为声明中的最后两个值，而且``font``声明中必须有这两个值。

### 如何水平居中一个元素
- 如果需要居中的元素为**常规流中inline元素**，为父元素设置`text-align: center;`即可实现
- 如果需要居中的元素为**常规流中block元素**，1）为元素设置宽度，2）设置左右margin为auto。
```
#main {
  max-width: 600px;
  margin: 0 auto; 
}
```
- 如果需要居中的元素为**浮动元素**，1）为元素设置宽度，2）`position: relative;`，3）浮动方向偏移量（left或者right）设置为50%，4）浮动方向上的margin设置为元素宽度一半乘以-1

```
<body>
    <div class="content">
    aaaaaa aaaaaa a a a a a a a a 
    </div>
</body>

<style>
    body {
        background: #DDD;
    }
    .content {
        width: 500px;         /* 1 */
        float: left;

        position: relative;   /* 2 */
        left: 50%;            /* 3 */
        margin-left: -250px;  /* 4 */
        
        background-color: purple;
    }
</style>
```

- 如果需要居中的元素为**绝对定位元素**，1）为元素设置宽度，2）偏移量设置为50%，3）偏移方向外边距设置为元素宽度一半乘以-1

```
<body>
    <div class="content">
    aaaaaa aaaaaa a a a a a a a a 
    </div>
</body>

<style>
    body {
        background: #DDD;
        position: relative;
    }
    .content {
        width: 800px;

        position: absolute;
        left: 50%;
        margin-left: -400px;
        
        background-color: purple;
    }
</style>
```

- 如果需要居中的元素为**绝对定位元素**，1）为元素设置宽度，2）设置左右偏移量都为0,3）设置左右外边距都为auto

```html
<body>
    <div class="content">
    aaaaaa aaaaaa a a a a a a a a 
    </div>
</body>

<style>
    body {
        background: #DDD;
        position: relative;
    }
    .content {
        width: 800px;

        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        
        background-color: purple;
    }
</style>
```
### 如何竖直居中一个元素
参考资料：[6 Methods For Vertical Centering With CSS](http://www.vanseodesign.com/css/vertical-centering/)。 [盘点8种CSS实现垂直居中](http://blog.csdn.net/freshlover/article/details/11579669) 

- 需要居中元素为**单行文本**，为包含文本的元素设置大于`font-size`的`line-height`：

```
<p class="text">center text</p>

<style>
.text {
    line-height: 200px;
}
</style>
```