/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 09:28:18
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 09:28:30
 */
const throttle = function(fn, delay, isDebounce) {
  let timer
  let lastCall = 0
  return function (...args) {
    if (isDebounce) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    } else {
      const now = new Date().getTime()
      if (now - lastCall < delay) return
      lastCall = now
      fn(...args)
    }
  }
}