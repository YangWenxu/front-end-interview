/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-14 16:23:25
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-14 16:45:58
 */
// 字节面试题
// 实现一个repeat方法，要求如下
// //需要实现的函数
// function repeat(func, times, wait) {}
// //使下面调用代码能正常工作
// const repeatFunc=repeat(console.log,4,3000);
// repeatFunc("helloworld");
// //会输出4次helloworld，每次间隔3秒

function repeat(func, times, wait) {
  return function (str) {
    let timer = null
    let i = 0;
    timer = setInterval(()=>{
      while (i >= times) {
        clearInterval(timer)
        return
      }
      i++
      func.call(this, str)
    }, wait)
  }
}
const repeatFunc = repeat(console.log, 4, 3000);
repeatFunc("helloworld");