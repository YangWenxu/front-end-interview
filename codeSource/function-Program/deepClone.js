/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-07 09:31:23
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-15 11:31:56
 */
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
let a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  }
}
let b = deepClone(a);

b.name = "change";
b.book.price = "55";
console.log(a);
console.log(b);
