---
title: js基础面试题1
tags: javascript
---

全情投入，专注极致，刻意练习，守正出奇，未闻花名，愿等花开

<!--more-->

## 原型实例对象构造函数

## 创建对象的方式

```javaScript

function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name);
  }
}
var person = new Person("james");

```

## 继承的方式

```javaScript

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {

  Parent.call(this, name);

  this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('devin', '18');

child1.colors.push('black');

console.log(child1.name); // devin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('young', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

```

## 手写实现new

```javaScript

function create() {
  Con = [].shift.call(arguments);
  var obj = Object.create(Con.prototype);
  var ret = Con.apply(obj,arguments);
  return ret instanceof Object ? ret : obj;
}

function Car(color, name) {
  this.color = color;
  return {
    name: name
  }
}
var car = create(Car, "blue", "宝马")
console.log(car.color);
console.log(car.name)

```

## 手写实现instanceOf

```javaScript

function instanceOf(left, right){
  let proto = left._proto_;
  let prototype = right.prototype;
  while (true) {
    if(proto === null)
      return false;
    if(proto === prototype) 
      return true;
    proto = proto._proto_;
  }
}

```

## 手写实现call

1. 用this获取这个函数并设置为对象的属性
2. 执行这个函数
3. 删除这个函数
4. 指定this到函数并传入给定参数执行函数,如果不传入参数，默认指向为 window

```javaScript

Function.prototype.call2 = function(context = window) {
  context.fn = this;
  let args = [...arguments].slice(1);
  context.fn(...args);
  delete context.fn;
}

var foo = {
  value: 'zhaobuchu',
}
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
bar.call2(foo, 'yangwenxu', 22)

```

## 手写实现apply

```javaScript

Function.prototype.apply2 = function(context = window) {
  context.fn = this;
  if(arguments[1]) {
    var result = context.fn(...arguments[1])
  } else {
    var result = context.fn();
  }
  delete context.fn;
  return result;
}

var obj = {
  value: "zhaobuchu"
}

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar.apply2(obj, ["yangwenxu", 22]);

```

## 手写实现bind

1. 使用 call / apply 指定 this 。
2. 使用 return 返回一个函数。
3. 使用 arguments 获取参数数组并作为 self.apply() 的第二个参数。
4. 获取返回函数的参数，然后同第3点的参数合并成一个参数数组，并作为 self.apply() 的第二个参数.

```javaScript

Function.prototype.bind2 = function(context){
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  let self = this;
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    var bindArgs = [].slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  }
}


var value = 2;
var foo = {
  value: "zhaobuchu",
}
function bar(name, age){
  return {
    value: this.value,
    name: name,
    age: age,
  }
}
var bindFoo = bar.bind2(foo, "james");
bindFoo(22);
```

一个绑定函数也能使用new操作符创建对象：
这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```javascript

Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      
      // 注释1
      return self.apply(
          this instanceof fBound ? this : context, 
          args.concat(bindArgs)
      );
  }
  // 注释2
  fBound.prototype = this.prototype;
  return fBound;
}
var value = 2;
var foo = {
  value: "zhaobuchu",
}
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'Jack');
var obj = new bindFoo(20);

console.log(obj.habit);

console.log(obj.friend);

```

bind实现需要考虑实例化后对原型链的影响。
用一个空对象作为中介，把 fBound.prototype 赋值为空对象的实例（原型式继承）。

```javascript

Function.prototype.bind2 = function (context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

```
