/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-14 15:39:55
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-15 11:01:06
 */
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
