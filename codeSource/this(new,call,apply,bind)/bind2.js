/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 11:04:20
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 11:14:26
 */

//一个绑定函数也能使用new操作符创建对象：
//这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
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