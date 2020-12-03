/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 10:49:45
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 11:19:21
 */

// 1. 使用 call / apply 指定 this 。
// 2. 使用 return 返回一个函数。
// 3. 使用 arguments 获取参数数组并作为 self.apply() 的第二个参数。
// 4. 获取返回函数的参数，然后同第3点的参数合并成一个参数数组，并作为 self.apply() 的第二个参数.

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