/*
 * @Descripttion: 
 * @version: 
 * @Author: yangwenxu
 * @Date: 2020-12-14 15:04:54
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-14 23:24:34
 */
class EventEmitter {
  listeners = {};
  on(name,fn) {
    (this.listeners[name] || (this.listeners[name] = [])).push(fn);
  }
  once(name,fn) {
    let tem = (...args) => {
      this.removeListener(name, fn)
      fn(...args)
    }
    fn.fn = tem
    this.on(name, tem)
  }
  remove(name,fn) {
    if(this.listeners[name]) {
      this.listeners[name] = this.listeners[name].filter(listener=> (
        listener!==fn && listener!==fn.fn
      ))
    }
  }
  emit(name, ...args) {
    if(this.listeners[name]) {
      this.listeners[name].forEach(fn=> {
        fn.call(this, ...args);
      })
    }
  }
}
const eventEmitter = new EventEmitter();
eventEmitter.on('click', () => {
    console.log('click 1')
})
eventEmitter.on('click', () => {
    console.log('click 2')
})

// eventEmitter.off('click')
eventEmitter.emit('click')
eventEmitter.once('click')
// console.log(eventEmitter);