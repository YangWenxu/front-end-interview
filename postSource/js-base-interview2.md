---
title: js基础面试题2
tags: javascript
---

全情投入，专注极致，刻意练习，守正出奇，未闻花名，愿等花开

<!--more-->

## 手写一个防抖

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

## for in 和 for of的区别

1. for in遍历数组会遍历到数组原型上的属性和方法, 更适合遍历对象

2. forEach不支持break, continue, return等

3. 使用for of可以成功遍历数组的值, 而不是索引, 不会遍历原型

4. for in 可以遍历到myObject的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性

## 手写并实现数据拦截器

```javaScript

```

## 手写promise

1. 优点: 解决回调地狱, 对异步任务写法更标准化与简洁化

2. 缺点: 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消; 	其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部; 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成).

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
var p = new myPromise((resolve, reject) => {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});


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

## 事件机制，Event Loop

1. 如何实现一个事件的发布订阅

   实现: 发布者管理订阅者队列, 并有新消息推送功能. 订阅者仅关注更新就行

2. 事件循环机制

3. 宏认为和微任务的区别