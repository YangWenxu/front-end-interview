// 来自迅雷前端的一道笔试题

// 实现一个EventEmitter类，实现以下方法：

// 1.emitter.on(name, fn) //订阅name事件，监听函数为fn，可多次订阅

// 2.emitter.once(name, fn) //功能与on类似，但监听函数为一次性的，触发后自动移除

// 3.emitter.emit(name, data1, data2, ..., datan) //发布name事件，所有订阅该事件的监听函数被触发，data1,…,datan作为参数传给监听函数，若有多个函数，按照顺序执行

// 4.emitter.remove(name, fn) //移除name事件的监听函数fn

function EventEmitter() {
  //缓存列表，存放订阅者列表
  var list = [];
  var instance;

  //判断事件是否曾被订阅
  var on = function (name, fn, type = 0) {  //订阅name事件，监听函数为fn，type = 0表示永久订阅 =1表示一次订阅 
    if (!list[name]) {
      list[name] = [];
    }
    list[name].push([fn, type]);//监听函数插入该事件列表
  };

  //订阅一次触发后删除
  var once = function (name, fn, type = 1) {
    on(name, fn, type);
  };

  //发布
  var emit = function (name) {

    var fns = list[name];//取出事件 
    var args = [].slice.call(arguments, 1);//获取参数列表

    if (!fns || fns.length == 0) {//判断监听函数是否存在
      return;
    }

    for (var i = 0; i < fns.length, fn = fns[i++];) {

      fn[0].apply(this, args);//调用监听函数fn

      if (fn[1] == 1) {//判断是否只订阅一次

        remove(name, fn[0], 1);//订阅一次触发后删除
      }
    }
  };

  //删除事件
  var remove = function (name, fn, type = 0) {
    if (!name) {//如果事件不存在，直接return
      return;
    }
    var fns = list[name]; //取出事件

    if (!fn) {
      list[name] = []; //未传入监听函数，取消全部
    } else {
      for (var i = 0; i < fns.length, fn1 = fns[i]; i++) {

        if (fn === fn1[0] && type === fn1[1]) {

          fns.splice(i, 1);//找到对应函数，删除之
        }
      }
    }
  };
  return {//返回一个对象
    on: on,
    once: once,
    emit: emit,
    remove, remove
  }
}

var emitter = new EventEmitter();
var log = console.log;
emitter.on('someTask', log);//判断log事件是否被订阅
emitter.emit('someTask', 1);//1  发布
emitter.emit('someTask', 1, 2);//1,2   发布
emitter.once('someTask', log); //只订阅一次log事件  
emitter.emit('someTask', 1);//1
emitter.emit('onceTask', 1);//第二次不输出
emitter.remove('someTask', log); //删除事件
emitter.emit('someTask', 1);//删除事件后不输出