---
title: js基础面试题1
tags: javascript
categories: interview
---

1. 数据类型判断
2. 原型，实例，对象，构造函数，创建对象，继承
3. 实现new，instanceof，call,  apply, bind

<!--more-->

## JS中数据类型的判断

1. **typeof** 对于原始类型来说，除了 null 都可以显示正确的类型

- ```js
  console.log(typeof 2);               // number
  console.log(typeof true);            // boolean
  console.log(typeof 'str');           // string
  console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
  console.log(typeof function(){});    // function
  console.log(typeof {});              // object
  console.log(typeof undefined);       // undefined
  console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object
  ```

  typeof 对于对象来说，除了函数都会显示 object，像数组和对象都是object，所以想判断一个对象的正确类型，这时候需要使用  instanceof

2. **instanceof**

     instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

- ```js
  console.log(2 instanceof Number);                    // false
  console.log(true instanceof Boolean);                // false 
  console.log('str' instanceof String);                // false  
  console.log([] instanceof Array);                    // true
  console.log(function(){} instanceof Function);       // true
  console.log({} instanceof Object);                   // true    
  // console.log(undefined instanceof Undefined);
  // console.log(null instanceof Null);
  ```

    instanceof可以精准判断引用数据类型（Array，Function，Object），而基本数据类型不能被instanceof精准判断。

    instanceof 在MDN中的解释：instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

3. **constructor**

- ```js
  console.log((2).constructor === Number); // true
  console.log((true).constructor === Boolean); // true
  console.log(('str').constructor === String); // true
  console.log(([]).constructor === Array); // true
  console.log((function() {}).constructor === Function); // true
  console.log(({}).constructor === Object); // true
  这里有一个坑，如果我创建一个对象，更改它的原型，constructor就会变得不可靠了
  function Fn(){};
   
  Fn.prototype=new Array();
   
  var f=new Fn();
   
  console.log(f.constructor===Fn);    // false
  console.log(f.constructor===Array); // true 
  ```


4. **Object.prototype.toString.call()** 使用 Object 对象的原型方法 toString ，使用 call 进行狸猫换太子，借用Object的 toString 方法

- ```js
  var a = Object.prototype.toString;
   
  console.log(a.call(2));
  console.log(a.call(true));
  console.log(a.call('str'));
  console.log(a.call([]));
  console.log(a.call(function(){}));
  console.log(a.call({}));
  console.log(a.call(undefined));
  console.log(a.call(null));
  ```


## 原型,实例,对象,构造函数

​    <img src="http://yangwenxu.cn/assets/images/prototype.png" alt="prototype" style="zoom: 67%;" />

## 创建对象的方式

- ```javaScript
  
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

- ```javaScript
  
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

1. 创建一个简单的空对象

2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；

3. 将创建的新的对象作为this的上下文

4. 如果该函数没有返回对象则返回this， 如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象

- ```js
     function create(){
       var obj = new Object();
       let con = [].shift.call(arguments);
       obj.__proto__ = con.prototype;
       con.apply(obj, arguments);
       return obj;
     }
     
     function Car(color){
       this.color = color;
     }
     
     Car.prototype.start = function() {
       console.log(this.color + "zhaobuchu"); 
     }
     
     var car = create(Car, "blue")
     console.log(car.color);
     console.log(car.start());
  ```




- ```javaScript
  
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

  instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

  实现 instanceof：

1. 首先获取类型的原型
2. 然后获得对象的原型
3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null

- ```javaScript
  
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

- ```javaScript
  
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

- ```javaScript
  
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

- ```javaScript
  
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

- ```javascript
  
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

- ```javascript
  
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
