#Flexbox
弹性布局可用于多行自适应，多列自适应，间距自适应和任意对齐。
* 水平或垂直排成一行
* 控制子元素对齐方式
* 控制子元素的宽度/高度
* 控制子元素显示顺序
* 控制子元素是否折行

![](/axis.png)

###创建 flex container
```
display: flex
/* 弹性容器内的均为弹性元素*/
```

####flex-direction
```
/* 伸缩流(主轴)方向，默认值为 row */
flex-direction: row | row-reverse | column | column-reverse
```

####flex-wrap
```
/* 伸缩行换行，默认值为 nowrap */
flex-wrap: nowrap | wrap | wrap-reverse
```

####flex-flow
flex-flow 为 flex-wrap 与 flex-direction 的简写，建议使用此属性（避免同时使用两个属性来修改）。
```
flex-flow: <'flex-direction'> || <'flex-wrap'>
```

####justify-content
其用于设置主轴（main-axis）上的对其方式。弹性元素根据主轴（横向和纵向均可）定位所以不可使用 left 与 right 因为位置为相对的。（行为相似的属性有 text-align）
```
justify-content: flex-start | flex-end | center | space-between | space-around
/* 默认值为 flex-start */
```

####align-items
其用于设置副轴（cross-axis）上的对其方式。（行为相似的属性有 vertical-align）
```
align-items: flex-start | flex-end | center | baseline | stretch
/* 默认值为 stretch */
```

####align-content
对齐伸缩行
```
align-content:flex-start | flex-end | center | space-between | space-around | stretch
/* 默认为 stretch */
```

---

###flex item

只有弹性容器在文档流中的子元素才属于弹性元素。
```
<div style="display: flex;">
  <div>block</div>
  <!-- flex item: YES-->
  <div style="float: left;">float</div>
  <!-- flex item: YES-->
  <span>inline</span>
  <!-- flex item: YES-->
  <div style="position:absolute;">Absolute Block Element</div>
  <!-- flex item: No-->
  <div>
  	<div>grandson</div>
  </div>
  <!-- flex item: No-->
</div>
```

####order
order 的值为相对的（同被设置和未被设置的值相比较），当均为设置时默认值为 0 则按照文档流中的顺序排列。
```
order: <integer>
/* 默认为 0 */
```

####flex-basis
其用于设置 flex-item 的初始宽高（并作为弹性的基础）。如果 flex-direction 是以 row 排列则设置宽，如以 column 排列则设置高。
```
flex-basis: main-size | <width>
```

####flex-grow
伸展因子，其为弹性布局中最重要的元素之一，flex-grow 设置元素可用空余空间的比例。flex-container 先按照宽度（flex-basis）进行布局，如果有空余空间就按照 flex-grow 中的比例进行分配。
```
flex-grow: <number>
initial: 0
/* 默认值为 0 */
```

```
/* 让两个初始为0的块按比例占据剩下空间 */
.item2 {flex-grow: 1;}
.item3 {flex-grow: 2;}
.item2, .item3 {flex-basis: 0;}
```

####flex-shrink

收缩因子，用于分配超出的负空间如何从可用空间中进行缩减。
```
flex-shrink: <number>
initial: 1
/* 默认值为 1，进行平摊 */
```

####flex
其为 ``flex-grow`` ``flex-shrink`` ``flex-basis`` 的值缩写。
```
flex: <'flex-grow'> || <'flex-shrink'> || <'flex-basis'>
initial: 0 1 main-size
```

####align-self
其用于设置单个 flex-item 在 cross-axis 方向上的对其方式。
```
align-self: auto | flex-start | flex-end | center | baseline | stretch
/* 默认值为 auto */
```

###使用Flexbox的居中布局
```
display: flex;
align-items: center;
justify-content: center;
```