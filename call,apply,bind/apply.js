/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 10:18:30
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 10:24:37
 */
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