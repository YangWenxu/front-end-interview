---
title: js基础面试题3
tags: javascript
categories: interview
---

1. 堆栈，内存分配，垃圾回收机制，执行上下文，变量对象，作用域链，
2. 作用域闭包，强大的闭包应用场景
3. 深浅拷贝的实现

<!--more-->

[木易杨](https://muyiy.cn/blog/)

[冴羽](https://github.com/mqyqingfeng/Blog/issues/8)

## 堆栈

1. 基本类型 --> 保存在**栈**内存中，因为这些类型在内存中分别占有固定大小的空间，通过按值来访问。基本类型一共有6种：Undefined、Null、Boolean、Number 、String和Symbol

2. 引用类型 --> 保存在**堆**内存中，因为这种值的大小不固定，因此不能把它们保存到栈内存中，但内存地址大小的固定的，因此保存在堆内存中，在栈内存中存放的只是该对象的访问地址。当查询引用类型的变量时， 先从**栈中读取内存地址**， 然后再通过地址**找到堆中的值**。对于这种，我们把它叫做按引用访问。

3. 堆数据结构是一种树状结构。它的存取数据的方式与书架和书非常相似。我们只需要知道书的名字就可以直接取出书了，并不需要把上面的书取出来。JSON格式的数据中，我们存储的`key-value`可以是无序的，因为顺序的不同并不影响我们的使用，我们只需要关心书的名字。

## 内存分配

​    JavaScript有自动垃圾收集机制，垃圾收集器会每隔一段时间就执行一次释放操作，找出那些不再继续使用的值，然后释放其占用的内存。

- 局部变量和全局变量的销毁

  - **局部变量**：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
  - **全局变量**：全局变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量**避免**使用全局变量。

- 以Google的V8引擎为例，V8引擎中所有的JS对象都是通过堆来进行内存分配的

  - **初始分配**：当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量。
  - **继续申请**：当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。

- V8引擎对堆内存中的JS对象进行分代管理

  - **新生代**：存活周期较短的JS对象，如临时变量、字符串等。
  - **老生代**：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等

## v8引擎的垃圾回收机制

v8 的垃圾回收机制基于分代回收机制，这个机制又基于世代假说，这个假说有两个特点，一是新生的对象容易早死，另一个是不死的	对象会活得更久。基于这个假说，v8 引擎将内存分为了新生代和老生代。新创建的对象或者只经历过一次的垃圾回收的对象被称为新	生代。经历过多次垃圾回收的对象被称为老生代。新生代被分为 From 和 To 两个空间，To 一般是闲置的。当 From 空间满了的时候会	执行 Scavenge 算法进行垃圾回收。当我们执行垃圾回收算法的时候应用逻辑将会停止，等垃圾回收结束后再继续执行。

老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由	于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。

由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回	收的时间长，停顿会造成很大的影响。 为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完	一小步就让运行逻辑执行一会，就这样交替运行。

## 执行上下文

执行上下文主要包括变量对象，作用域链，this三部分。

### 变量对象

1. 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。因为不同执行上下文下的变量对象稍有不同，可以分为全局上下文下的变量对象和函数上下文下的变量对象。在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。

2. 活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

3. 活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

4. 总结：
    
    ```
    a. 全局上下文的变量对象初始化是全局对象
    b. 函数上下文的变量对象初始化只包括 Arguments 对象
    c. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
    d. 在代码执行阶段，会再次修改变量对象的属性值
    ```
    
    

### 作用域链

	当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，
	一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

### this

    this可以简单的理解为调用函数的对象，追根溯源的从 ECMASciript 规范解读 this 指向的话，属实复杂

## 执行上下文栈

 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

这两段代码都会打印'local scope',但是区别在于执行上下文栈的变化是不一样的。

第一段代码的执行过程：

1.执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈

```js
    ECStack = [
        globalContext
    ];
```

2.全局上下文初始化

```js
    globalContext = {
        VO: [global],
        Scope: [globalContext.VO],
        this: globalContext.VO
    }
```

2.初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]

```js
    checkscope.[[scope]] = [
      globalContext.VO
    ];
```

3.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

```js
    ECStack = [
        checkscopeContext,
        globalContext
    ];
```

4.checkscope 函数执行上下文初始化：

1. 复制函数 [[scope]] 属性创建作用域链，
2. 用 arguments 创建活动对象，
3. 初始化活动对象，即加入形参、函数声明、变量声明，
4. 将活动对象压入 checkscope 作用域链顶端。

同时 f 函数被创建，保存作用域链到 f 函数的内部属性[[scope]]

```js
    checkscopeContext = {
        AO: {
            arguments: {
                length: 0
            },
            scope: undefined,
            f: reference to function f(){}
        },
        Scope: [AO, globalContext.VO],
        this: undefined
    }
```

5.执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈

```js
    ECStack = [
        fContext,
        checkscopeContext,
        globalContext
    ];
```

6.f 函数执行上下文初始化, 以下跟第 4 步相同：

1. 复制函数 [[scope]] 属性创建作用域链
2. 用 arguments 创建活动对象
3. 初始化活动对象，即加入形参、函数声明、变量声明
4. 将活动对象压入 f 作用域链顶端

```js
    fContext = {
        AO: {
            arguments: {
                length: 0
            }
        },
        Scope: [AO, checkscopeContext.AO, globalContext.VO],
        this: undefined
    }
```

7.f 函数执行，沿着作用域链查找 scope 值，返回 scope 值

8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

```js
    ECStack = [
        checkscopeContext,
        globalContext
    ];
```

9.checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出

```js
    ECStack = [
        globalContext
    ];
```

## 作用域闭包

### 1. 作用域

    (1). 在js作用域环境中访问变量的过程是由内向外的，
    (2). 内部作用域可以获得当前作用域下的变量并且可以获得当前包含当前作用域的外层作用域下的变量，反之则不能，
    (3). 也就是说在外层作用域下无法获取内层作用域下的变量，同样在不同的函数作用域中也是不能相互访问彼此变量的。

### 2. 闭包

```
(1).  一个函数内部也有限权访问另一个函数内部的变量，闭包的本质就是在一个函数内部创建另一个函数。
(2).  简单来说就是A函数里面返回了B函数，B函数可以访问A函数里面的变量。
(3).  在MDN里面闭包是说那些能够访问自由变量的函数，而自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量  的变 量，所以闭包 = 函数 + 函数能够访问的自由变量。
(4).  闭包的参数和变量不会被垃圾回收机制2回收，所以可能会造成内存泄露，解决方法是可以在使用完变量后手动为它赋值为null。
```

### 3. 经典闭包题

   ```js
   var data = [];
   
   for (var i = 0; i < 3; i++) {
     data[i] = function () {
       console.log(i);
     };
   }
   
   data[0]();
   data[1]();
   data[2]();
   ```

   答案是都是 3, 其实这段代码相当于以下这样：

   ```js
   var data = [];
   for (var i = 0; i < 3; i++) {
     var fun = function () {
       console.log(i);
     }
     data[i] = fun;
   }
   data[0]();
   data[1]();
   data[2]();
   
   ```

   当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

   ```
   globalContext = {
       VO: {
           data: [...],
           i: 3
       }
   }
   ```

   当执行 data[0] 函数的时候，data[0] 函数的作用域链为：

   ```
   data[0]Context = {
       Scope: [AO, globalContext.VO]
   }
   ```

   data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

   data[1] 和 data[2] 也是一样的道理。

   使用闭包的方式如下： 

####    (1). ES6中的let

-    ```js
     var data = [];
     for (let i = 0; i < 3; i++) {
       data[i] = function () {
         console.log(i);
       };
     }
     
     data[0]();
     data[1]();
     data[2]();
     ```


####    (2). 立即执行函数

-    ```js
     for (var i = 0; i < 3; i++) {
         (function(num) {
             setTimeout(function() {
                 console.log(num);
             }, 1000);
         })(i);
     }
     // 0
     // 1
     // 2
     ```


#### 	(3). 返回一个匿名函数赋值

- ```js
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


​        当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

- ```
  globalContext = {
      VO: {
          data: [...],
          i: 3
      }
  }
  ```

  跟没改之前一模一样。

  当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：

- ```
  data[0]Context = {
      Scope: [AO, 匿名函数Context.AO globalContext.VO]
  }
  ```

  匿名函数执行上下文的AO为：

- ```
  匿名函数Context = {
      AO: {
          arguments: {
              0: 0,
              length: 1
          },
          i: 0
      }
  }
  ```

  data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

  data[1] 和 data[2] 是一样的道理。

## 深浅拷贝的原理和手写实现

### 如何实现浅拷贝

1. `Object.assign()`
2. 数组展开语法 `Spread`
3. `Array.prototype.slice()`、
4. `Array.prototype.concat()`

### 如何实现深拷贝

1. 写一个deepClone函数，递归遍历数组或者对象中嵌套的每一个子数组和子对象

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
2. JSON.parse(JSON.stringify(object))

### 深拷贝中需要注意的问题

    1. 会忽略 `undefined`
    2. 会忽略 `symbol`
    3. 不能序列化函数
    4. 不能解决循环引用的对象
    5. 不能正确处理`new Date()`
    6. 不能处理正则

### 如何解决循环引用的问题

解决方案很简单，其实就是循环检测，我们设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可。

### Lodash是如何实现深拷贝的