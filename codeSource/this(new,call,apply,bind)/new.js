/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 11:20:41
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 11:53:19
 */
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