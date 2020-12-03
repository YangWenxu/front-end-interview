/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 09:22:00
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 09:27:36
 */
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