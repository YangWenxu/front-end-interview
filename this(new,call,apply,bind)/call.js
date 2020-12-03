/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 09:33:49
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 10:07:55
 */
// 1. 用this获取这个函数并设置为对象的属性
// 2. 执行这个函数
// 3. 删除这个函数
// 4. 指定this到函数并传入给定参数执行函数,如果不传入参数，默认指向为 window

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