/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-03 09:30:42
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-03 09:30:55
 */
// 基础版本: 基于时间实现节流函数
function throttle(fx, delay = 300) {
  let pre = Date.now();
  return (...args) => {
    let cur = Date.now();
    console.log(cur - pre)
    if(cur - pre >= delay) {
      fx.apply(this, args);
      pre = Date.now();
    }
  }
}

// 基础版本: 基于定时器实现节流函数
function throttle(fx, delay = 300) {
  let time = null;
  return (...args) => {
    if(!time) {
      time = setTimeout(() => {
        fx.apply(this, args);
        time = null;
      }, delay);
    }
  }
}

// 基于定时器+时间实现节流函数, 第一次触发, 后面每delay周期执行一次, 最后一次触发执行
function throttle(fx, delay = 300) {
  let pre, time;
  return (...args) => {
    const now = Date.now();
    if (pre && now < delay + pre) {
      // 处于delay期间内
      clearTimeout(time);
      time = setTimeout(() => {
        pre = now;
        fx.apply(this, args);
        console.log('最后一次执行');
      }, delay);
    } else {
      pre = now;
      // 第一次执行
       // delay周期执行一次
      fx.apply(this, args);
    }
  };
}