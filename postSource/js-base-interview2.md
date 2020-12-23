---
title: js基础面试题2
tags: javascript
categories: interview
---

2. js的模块化
3. 事件执行机制，event-loop，发布订阅，事件委托，宏任务微任务
4. 防抖节流，函数柯里化，数组扁平化，promise异步，generator，sleep函数

<!--more-->

## js的模块化

1. 模块化发展历史

- 第一种是 CommonJS 方案，它通过 require 来引入模块，通过 module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。

- 第二种是 AMD 方案，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。require.js 的核心原理是通过动态创建 script 脚本来异步引入模块，然后对每个脚本的 load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数。

- 第三种是 CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。它和require.js的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。

- 第四种方案是 ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。

2. AMD 和 CMD 规范的具体区别？
   第一个方面是在模块定义时对依赖的处理不同。AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇就近依赖，只有在用到某个模块的时候再去 require。
   第二个方面是对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于模块的加载方式都是异步加载，不过它们的区别在于 模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。

## 手写一个防抖

效果: 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户一直触发这个函数，且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。

```javaScript

function debounce(func, time, immediate) {
  var timer = null;
  return ()=> {
    if(immediate) {
      func.apply(this, arguments);
      immediate = false;
    }
    clearTimeout(timer);
    timer = setTimeout(()=> {
      func.apply(this, arguments);
    }, time)
  }
}
document.querySelector('.butn').onclick = debounce(function () {
  console.log('- debounce -')
}, 1000)

```

## 手写一个节流

当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发小于既定值，函数节流会每隔这个时间调用一次

```javaScript

function throttle(fn, wait, immediate) {
  let lastTime = 0;
  return ()=> {
    if(immediate) {
      func.apply(this, arguments);
      immediate = false;
    }
    var current = Date.now();
    if(current - lastTime > wait) {
      fn.apply(this, arguments);
      lastTime = Date.now();
    }
  }
}
document.onscroll = throttle(function () {
  console.log('- throttle - ')
}, 1000)

```

总之，防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行

## 手写实现函数柯里化

```javaScript
function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function(){
    var newArr = args.concat(Array.prototype.slice.call(arguments));
    if(newArr.length < length){
      return curry.call(this, fn, newArr);
    } else {
      return fn.apply(this, newArr);
    }
  }
}

function multiFn(a, b, c) {
  return a*b*c;
}
var multi = curry(multiFn);
multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);

```

## 手写一个数组扁平化

```js
function flatten(arr) {
  let result = [];
  for(let i =0; i< arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
var arr = [1,2,[1,2]];
console.log(flatten(arr));
```

## for in 和 for of的区别

1. for in遍历数组会遍历到数组原型上的属性和方法, 更适合遍历对象

2. forEach不支持break, continue, return等

3. 使用for of可以成功遍历数组的值, 而不是索引, 不会遍历原型

4. for in 可以遍历到myObject的原型方法method,

   如果不需要遍历原型方法和属性的话，hasOwnPropery方法可以判断某属性是否是该对象的实例属性

## 手写promise

1. 优点: 解决回调地狱, 对异步任务写法更标准化与简洁化

2. 缺点: 

   ​	a. 无法取消Promise，一旦新建它就会立即执行，无法中途取消; 	

   ​	b. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部; 

   ​	c. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成).

```javaScript

function myPromise(constructor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.reason = undefined;
  function resolve(value) {
    if (self.status == "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }
  function reject(value) {
    if (self.status == "pending") {
      self.reason = value;
      self.status = "rejected";
    }
  }
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
  }
};
var p = new myPromise((resolve, reject) => {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});
```
```javascript
Promise.prototype.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    if (promiseList.length === 0) return resolve([]);
    let result = [],
      count = 0;

    promiseList.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value;
          if (++count === promiseList.length) resolve(result);
        },
        (reason) => reject(reason)
      );
    });
  });
};

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

```

## 手写实现sleep函数

这种实现方式是利用一个伪死循环阻塞主线程。因为JS是单线程的。
所以通过这种方式可以实现真正意义上的sleep()。

```javaScript

function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

function test() {
  console.log('111');
  sleep(2000);
  console.log('222');
}

test()

```

## Generator，async和await：

1. Generator函数的语法糖，将*改成async，将yield换成await。

2. 是对Generator函数的改进, 返回promise。

3. 异步写法同步化，遇到await先返回，执行完异步再执行接下来的.

4. 内置执行器, 无需next()

## js事件执行机制，Event Loop

### 如何实现一个事件的发布订阅

实现: 发布者管理订阅者队列, 并有新消息推送功能. 订阅者仅关注更新就行

```js
class EventEmitter {
  listeners = {};
  on(name,fn) {
    (this.listeners[name] || (this.listeners[name] = [])).push(fn);
  }
  once(name,fn) {
    let tem = (...args) => {
      this.removeListener(name, fn)
      fn(...args)
    }
    fn.fn = tem
    this.on(name, tem)
  }
  remove(name,fn) {
    if(this.listeners[name]) {
      this.listeners[name] = this.listeners[name].filter(listener=> (
        listener!==fn && listener!==fn.fn
      ))
    }
  }
  emit(name, ...args) {
    if(this.listeners[name]) {
      this.listeners[name].forEach(fn=> {
        fn.call(this, ...args);
      })
    }
  }
}
const eventEmitter = new EventEmitter();
eventEmitter.on('click', () => {
    console.log('click 1')
})
eventEmitter.on('click', () => {
    console.log('click 2')
})

// eventEmitter.off('click')
eventEmitter.emit('click')
eventEmitter.once('click')
// console.log(eventEmitter);
```

### 事件循环机制event-loop

 <img src="http://yangwenxu.cn/assets/images/event-loop2.png" alt="图片" style="zoom: 50%;" />

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入`Event Table`并注册函数。
- 当指定的事情完成时，`Event Table`会将这个函数移入`Event Queue`。
- 主线程内的任务执行完毕为空，会去`Event Queue`读取对应的函数，进入主线程执行。
- 上述过程会不断重复，就是常说的`Event Loop`(事件循环)。

​     js引擎存在`monitoring process`进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去`Event Queue`那里检查是否有      等待被调用的函数。这就是js运行的整体流程

### 宏认为和微任务

  macro task:   **setTimeout、MessageChannel、postMessage、setImmediate**

  micro task:  有 **MutationObsever 和 Promise.then**

### 总结

1. 首先js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。
2. 在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务
3. 当同步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。
4. 任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。
5. 当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。
   

### 经典题型

```js
   setTimeout(function() {
     console.log(1)
   }, 0);
   new Promise(function(resolve, reject) {
     console.log(2);
     resolve()
   }).then(function() {
     console.log(3)
   });
   process.nextTick(function () {
     console.log(4)
   })
   console.log(5)
```

第一轮：主线程开始执行，遇到setTimeout，将setTimeout的回调函数丢到宏任务队列中，在往下执行new Promise立即执行，输出2，then的回调函数丢到微任务队列中，再继续执行，遇到process.nextTick，同样将回调函数扔到为任务队列，再继续执行，输出5，当所	有同步任务执行完成后看有没有可以执行的微任务，发现有then函数和nextTick两个微任务，先执行哪个呢？process.nextTick指定的异	步任务总是发生在所有异步任务之前，因此先执行process.nextTick输出4然后执行then函数输出3，第一轮执行结束。

第二轮：从宏任务队列开始，发现setTimeout回调，输出1执行完毕，因此结果是25431

## 事件委托

事件委托 本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到 目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。

使用事件代理我们可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理我们还可以实现事件的动态绑定，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。

当事件发生在 DOM 元素上时，该事件并不完全发生在那个元素上，这就是事件传播，有时间捕捉window----> document----> html----> body \---->目标元素event.target，事件目标，事件冒泡
