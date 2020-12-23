/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-07 09:31:23
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-14 16:49:33
 */
function instanceOf(left, right){
  let proto = left._proto_;
  let prototype = right.prototype;
  while (true) {
    if(proto === null)
      return false;
    if(proto === prototype) 
      return true;
    proto = proto._proto_;
  }
}