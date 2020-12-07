---
title: css-base-interview
tags: css
categories: interview
---

1. 基础：position，盒子模型，display，BFC，清除浮动，选择器，层叠上下文

2. 水平垂直居中，三栏布局，**flex布局**


<!--more-->


## position

### static : 默认

### relative相对定位
不脱离文档流，元素相对于自身 content box 定位，仍占据原来位置空间；

### absolute绝对定位
脱离文档流，元素相对于第一个 position 不为 static 的祖先元素的 padding box 定位，元素不占据原来位置空间；

### fixed固定定位
脱离文档流，元素相对于浏览器窗口顶部定位，不占据原来位置空间。

### sticky粘性定位


## css盒子模型

css 中，盒模型分为 content、padding、border、margin四部分，又有两种盒模型，通过 box-sizing 切换：

### 标准盒模型
当设置为 content-box 时，属于标准盒模型，在设置宽度和高度时，只包含 content，不包含 padding 和 border；
###  IE盒模型(怪异模型)
而设为 border-box 时，属于 IE 盒模型，设置宽度和高度时，包含 content、padding 和 border。

## 水平垂直居中

### 水平居中

1. 行内元素：`text-align:center`
2. 已知元素的宽度： 设置margin:0 auto
3. 元素的宽度不确定

- flex 布局 justify-content:center
- 设置为inline/inline-block布局，然后用text-align:center
- 绝对定位，使用transform:translateX(-width/2)或margin-left:-width/2

### 垂直居中

1. 行内元素：`line-height:height`或者给父元素设置`display:table-cell vertical-align:middle`

2. 使用定位，垂直方向移动50%的距离，然后使用margin-top或者tanslateY(-50%)

3. flex布局 aligin-items:center

### 水平垂直居中

- ### flex

```css
.parent {
    width: 520px;
    height: 260px;
    background-color: green;
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
.parent-transform {
    width: 520px;
    height: 260px;
    background-color: green;
    position: relative;
}

.child-transform {
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
.parent-margin {
    width: 520px;
    height: 260px;
    background-color: green;
    position: relative;
}

.child-margin {
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
    width: 520px;
    height: 260px;
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

## Flex布局

### flex布局概念
### flex的结构组成

1. Flex container
2. Flex Item

### 常用的Flex属性
### 常用的布局
1. 左右两列
2. 上下两列

## css的选择器

### 选择器的解析

样式系统从关键选择器开始，向左依次查找规则选择器的祖先元素，如果出现未匹配的情况会放弃规则，否则会左移直至匹配完成。因此在写样式时，应尽量选择 ID 选择器或 class 选择器作为关键选择器，并且减少样式的层级，降低消耗。
### 选择的优先级

1. @important 权重最高
2. 行内样式权重为 1000
3. ID 选择器权重为 0100
4. 类选择器，伪类选择器，属性选择器权重为 0010
5. 元素选择器和伪元素选择器权重为 0001
6. 通配符 > 继承 > 浏览器默认

## 高度塌陷，清除浮动

### 高度塌陷问题的两种类型
1. clear 属性
2. BFC块级格式化

### 两种类型的具体方案
1. 追加元素并设置 clear 属性
2. 使用 CSS 样式插入伪元素

after单伪元素

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

双伪元素

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
3. Bootstrap 的解决高度塌陷方案（BFC）

### 详解原理
1. 高度塌陷产生的原因是什么？
2. clear 属性清除浮动的原理是什么？
3. 采用 BFC 解决高度塌陷和clear属性清除浮动相比的优势是什么？

## BFC块级格式化上下文

1. 使 BFC 内部浮动元素不会到处乱跑；

2. 和浮动元素产生边界。

3. 清除浮动，防止margin重叠

   BFC 指的是格式化上下文，当一个元素形成 BFC 后，其内部元素的布局不会影响外部元素，外部元素的布局不会影响内部元素。可以用来清除浮动和解决 margin 重叠等问题。一般根元素、浮动元素、绝对定位元素、行内块元素、表格类元素、还有 overflow 不为 visible 的元素都会创建 BFC。


## overflow原理

1. overflow: hidden能清除块内子元素的浮动影响. 因为该属性进行超出隐藏时需要计算盒子内所有元素的高度, 所以会隐式清除浮动

2. 创建BFC条件(满足一个):

	float的值不为none；

	overflow的值不为visible；

	position的值为fixed / absolute；

	display的值为table-cell / table-caption / inline-block / flex / inline-flex。

## 三栏布局

### 浮动
左右两栏浮动（脱离文档流），中间一栏通过 margin 左右值（左右两栏的宽度以及栏外间距）,别忘了清浮动

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

## px rem em vh.vw这些单位的区别

1. px 像素，对于普通的屏幕，就是代表一个像素点。 

2. rem，是相对于根元素的font-size来决定的，可以由用户自己设定 

3. em 是根据元素的font-size大小来决定的 

4. vh 是当前视口高度的占比（视口就是当前肉眼可见的区域） ，1vh等于视窗高度的1%。

5. vw 是当前视口宽度的占比，1vw等于视窗宽度的1%。

## 层叠上下文，z-index

## display详解

1. 行内元素和块状元素

   块元素：独占一行，并且有自动填满父元素，可以设置margin和pading以及高度和宽度

   行元素：不会独占一行，width和height会失效，并且在垂直方向的padding和margin会失效。

2. display：none和visibility=hidden, opacity=0的区别

   opacity=0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件的

   visibility=hidden，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件

   display=none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉一样。

## 移动端适配

## background的`background-image` 和 `background-color` 属性

#### 	1. CSS 中的 `background` 的 `background-image` 属性可以和 `background-color` 属性一起生效么？

#### 	2. background-color` 属性可以覆盖 `background-image` 属性吗？

