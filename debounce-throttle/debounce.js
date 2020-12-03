/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 08:56:19
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 09:27:25
 */
function debounce(func, time, immediate) {
  var timer = null;
  return ()=> {
    if(immediate) {
      func.apply(this, arguments);
      immediate = false;
    }
    clearTimeout(timer);
    timer = setTimeout(()=> {
      func.apply(this, arguments);
    }, time)
  }
}
document.querySelector('.butn').onclick = debounce(function () {
  console.log('- debounce -')
}, 1000)