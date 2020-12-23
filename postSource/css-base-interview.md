---
title: css-base-interview
tags: css
categories: interview
---

1. 基础：position，盒子模型，display，BFC，清除浮动，选择器，层叠上下文

2. 水平垂直居中，三栏布局，**flex布局**


<!--more-->


## 1. position

 **static** : 默认

**relative相对定位**:
	不脱离文档流，元素相对于自身 content box 定位，仍占据原来位置空间； 

**absolute绝对定位**:
	脱离文档流，元素相对于第一个 position 不为 static 的祖先元素的 padding box 定位，元素不占据原来位置空间；

 **fixed固定定位**:
	脱离文档流，元素相对于浏览器窗口顶部定位，不占据原来位置空间。

 **sticky粘性定位**:
	必须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。
	设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible


## 2. css盒子模型

css 中，盒模型分为 content、padding、border、margin四部分，又有两种盒模型，通过 box-sizing 切换：

### 标准盒模型
当设置为 content-box 时，属于标准盒模型，在设置宽度和高度时，只包含 content，不包含 padding 和 border；
###  IE盒模型(怪异模型)
而设为 border-box 时，属于 IE 盒模型，设置宽度和高度时，包含 content、padding 和 border。

## 3. 水平垂直居中

### 水平居中

1. 行内元素：`text-align:center`
2. 已知元素的宽度： 设置margin:0 auto
3. 元素的宽度不确定:
    - flex 布局 justify-content:center
    - 设置为inline/inline-block布局，然后用text-align:center
    - 绝对定位，使用transform:translateX(-width/2)或margin-left:-width/2

### 垂直居中

1. 行内元素：`line-height:height`或者给父元素设置`display:table-cell vertical-align:middle`

2. 使用定位: 垂直方向移动50%的距离，然后使用margin-top或者tanslateY(-50%)

3. flex布局: aligin-items:center

### 水平垂直居中

- ### flex

```css
.parent {
    width: 800px;
    height: 300px;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
    background-color: pink;
    width: 300px;
    height: 150px;
}
```
- ### transform(css3属性)

```css
.parent {
    width: 800px;
    height: 300px;
    background-color: blue;
    position: relative;
}

.child{
    background-color: pink;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

```
- ### margin负值

```css
.parent {
    width: 800px;
    height: 300px;
    background-color: green;
    position: relative;
}

.child {
    background-color: pink;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;
    margin-left: -150px;
}

```
- ### absolute和margin

```css
.parent-absolute-margin {
    width: 800px;
    height: 300px;
    background-color: green;
    position: relative;
}

.child-absolute-margin {
    background-color: pink;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}

```

## 4. Flex布局

### flex布局概念:

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

### flex的结构组成:

Flex布局有两层,采用flex布局的元素称为flex容器,其子元素则自动成flex item,即项目.

1. Flex container
2. Flex Item

### 常用的Flex属性: 

Flex容器container:

1. flex容器有两根轴:水平主轴就是x轴(main axis)和竖直轴也是y轴(cross axis)
2. flex容器属性:

    - flex-direction:决定项目的排列方向。
    - flex-wrap:即一条轴线排不下时如何换行。
    - flex-flow:是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
    - justify-content:定义了项目在主轴上的对齐方式。(justify)
    - align-items:定义项目在交叉轴上如何对齐。
    - align-content:定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。(换		行会产生多轴)

3. Flex item属性:
    - order:定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    - flex-grow:定义项目的放大比例,如果所有项目的flex-grow属性都为1，则它们将等分剩余空间		（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空		间将比其他项多一倍。
    - flex-shrink:定义了项目的缩小比例，默认为1，如果所有项目的flex-shrink属性都为1，当空	    间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空		    间不足时，前者不缩小。
    - flex-basis:定义了在分配多余空间之前，项目占据的主轴空间（main size）。
    - flex:是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
    - align-self:允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为              auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

### 常用的布局
1. 左右两列
2. 上下两列

## 5. css的选择器

  ### 选择器的解析

样式系统从关键选择器开始，向左依次查找规则选择器的祖先元素，如果出现未匹配的情况会放弃规则，否则会左移直至匹配完成。因此在写样式时，应尽量选择 ID 选择器或 class 选择器作为关键选择器，并且减少样式的层级，降低消耗。
  ### 选择的优先级

1. @important 权重最高
2. 行内样式权重为 1000
3. ID 选择器权重为 0100
4. 类选择器，伪类选择器，属性选择器权重为 0010
5. 元素选择器和伪元素选择器权重为 0001
6. 通配符 > 继承 > 浏览器默认

## 6. 高度塌陷，清除浮动

### 高度塌陷产生的原因

   当父元素不给高度的时候，内部元素不浮动时会撑开, 而浮动的时候，父元素变成一条线, 造成塌陷.


### 清除浮动的方法

1. 额外标签法：在最后一个浮动标签后，新加一个标签，给其设置clear：both；

2. 触发BFC: 给父元素添加overflow:hidden;

   overflow: hidden能清除块内子元素的浮动影响. 

   因为该属性进行超出隐藏时需要计算盒子内所有元素的高度, 所以会隐式清除浮动

3. 使用after伪元素清除浮动

    ```css
    .clearfix::after {
      content: '';
      display: table; // clear 属性在块级元素下才能起作用
      clear: both;
    }
    .clearfix {
      *zoom: 1; // IE6+ 兼容
    }

    ```

4. 使用before和after双伪元素清除浮动

    ```css

    .clearfix::before,
    .clearfix::after {
      content: '';
      display: table;
    }
    .clearfix::after {
      clear: both;
    }
    .clearfix {
      *zoom: 1;
    }
    ```
## 7. BFC块级格式化上下文

1. BFC 指的是格式化上下文，当一个元素形成 BFC 后，内部元素和外部元素相互隔离，然后内部元素和外部元素不会相互影响。

2. 一般根元素、浮动元素、绝对定位元素、行内块元素、表格类元素、还有 overflow 不为 visible 的元素都会创建 BFC。

3. 应用：

    - 阻止`margin`重叠，

    - 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个`div`都位于同一个 BFC 区域之中)，

    - 自适应两栏布局

    - 可以阻止元素被浮动元素覆盖

## 8. 三栏布局

### 浮动
左右两栏浮动（脱离文档流），中间一栏通过 margin 左右值（左右两栏的宽度以及栏外间距), 注意要清除浮动

```css
.three-column-float {
    height: 200px;
    background-color: #ddd;
}

.float-left {
    float: left;
    width: 300px;
    height: 100%;
    background-color: deepskyblue;
}

.float-right {
    float: right;
    width: 300px;
    height: 100%;
    background-color: pink;
}
.float-center {
    height: 100%;
    margin: 0 320px;
}
```

### 绝对定位

左右两栏绝对定位（脱离文档流），中间一栏通过 margin 左右值（左右两栏的宽度以及栏外间距）

```css
.three-column-absolute {
    position: relative;
    height: 200px;
    background-color: #ddd;
}

.absolute-left {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 100%;
    background-color:deepskyblue;
}

.absolute-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: pink;
}

.absolute-center {
    height: 100%;
    margin: 0 320px;
}
```

## 9. px rem em vh.vw这些单位的区别

1. px 像素，对于普通的屏幕，就是代表一个像素点。 

2. rem，是相对于根元素的font-size来决定的，可以由用户自己设定 

3. em 是根据元素的font-size大小来决定的 

4. vh 是当前视口高度的占比（视口就是当前肉眼可见的区域） ，1vh等于视窗高度的1%。

5. vw 是当前视口宽度的占比，1vw等于视窗宽度的1%。

## 10. 层叠上下文，z-index

1. 层叠上下文： 三维z轴上的层叠关系
2. 产生： 普通元素设置`position`属性为非`static`值并设置`z-index`属性为具体数值，产生层叠上下文
3. 层叠等级：z-index>0  z-index:auto/z-index:0  inline-block float block  z-index<0

## 11. display详解

1. 行内元素和块状元素

   块元素：独占一行，并且有自动填满父元素，可以设置margin和pading以及高度和宽度

   行元素：不会独占一行，width和height会失效，并且在垂直方向的padding和margin会失效。

2. display：none和visibility=hidden, opacity=0的区别

   opacity=0：该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件的

   visibility=hidden：该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件
   
   display=none：把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉一样。

## 12. 移动端适配

## 13. background的`background-image` 和 `background-color` 属性

1. CSS 中的 `background` 的 `background-image` 属性可以和 `background-color` 属性一起生效么？
2. background-color` 属性可以覆盖 `background-image` 属性吗？

## 14. 预处理语言sass和less