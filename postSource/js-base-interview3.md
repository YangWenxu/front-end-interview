---
title: js基础面试题3
tags: javascript
---

全情投入，专注极致，刻意练习，守正出奇，未闻花名，愿等花开
计算机编程知识是需要积累的，花一两年时间啃下那些厚厚的经典书籍后，
才能构建自己的知识体系，然后阅读大量优秀源码，做一些有趣的项目，
编程能力就能突飞猛进啦。

<!--more-->

## 堆栈

## 执行上下文

### 变量对象
### 作用域链
### this

## 作用域闭包

```javascript

var data = [];
for(var i = 0; i<3; i++) {
  data[i] = (function(i) {
    return function() {
      console.log(i);
    }
  })(i)
}
data[0]();
data[1]();
data[2]();

```

## 深浅拷贝的原理和手写实现

### 如何实现深浅拷贝

```javascript

function deepClone(obj) {
  if(typeof obj == "object") {
    var result = obj.constructor == Array ? []: {};
    for(let i in obj) {
      result[i] = typeof obj[i] == "object" ? deepClone(obj[i]) : obj[i];
    }
  } else {
    var result = obj;
  }
  return result;
}

```
### 实现深拷贝需要注意哪些问题
### 如何解决循环引用的问题
