/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 12:12:15
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 12:21:11
 */
// 1、返回一个对象
// 2、没有 return，即返回 undefined
// 3、返回undefined 以外的基本类型

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