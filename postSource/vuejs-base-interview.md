---
title: vuejs-base-interview
tags: vue
categories: interview
---

整理一下vuejs的面试题。个人觉得框架方面还是要从源码原理出发，对于数据响应式，虚拟dom的源码原理应该刻意重复的练习。曾经看过某节目尤雨溪说自己学习的方法就是看源码写源码，大道至简。

<!--more-->

## 生命周期

   Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，  我们称这是 Vue 的生命周期。

```
beforeCreate: 组件实例被创建之初，组件的属性生效之前  
created:  组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 
beforeMount: 在挂载开始之前被调用：相关的 render 函数首次被调用  
mounted: el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子  
beforeUpdate: 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前  
update: 组件数据更新之后  
activited: keep-alive 专属，组件被激活时调用  
deadctivated: keep-alive 专属，组件被销毁时调用  
beforeDestory: 组件销毁前调用  
destoryed: 组件销毁后调用
```

## 组件中 data 为什么是一个函数？

1. vue组件可能会需要复用，所以存在多个实例，如果使用对象形式定义data，可能会导致它们共用一个data对象，那么状态变更将会影响所有组件实例。这当然是不合理的。
2. 所以采用函数形式定义，在initData时候将其作为工厂函数返回全新data对象，有效规避多实例之间的状态污染问题。
3. 但是在Vue根实例创建过程中不存在这种限制，根实例在合并选项的时候能拿到实例，所以可以有效的躲避data选项的校验。因为根实例只能有一个。 

## computed和watch的区别

1. computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

2. watch 侦听器 : 更多的是监听的作用,无缓存,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。

3. 运用场景：如果需要进行数值计算并依赖于其它数据时,应该使用 computed,因为可以利用 computed 的缓存特性,避免每次获取值时,都要重新计算。如果需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用  watch  选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。

## v-if,v-show,v-html的原理

1. v-if 是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。v-if在源码中就是一个三元表达式，是需要经过编译成render函数执行的，像template都是编译成render函数执行的。

2. v-show 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

3. 所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

## v-if和v-for的优先级

1. v-for优先于v-if被解析
2. v-for和v-if同时出现，v-for优先级高，就相当于在每一次for循环中都去执行一下if判断。
3. 所以说就不应该把它们放一起，因为哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表。
4. 一般是在向外层去写v-if，然后再写v-for，这样就是在if判断之后再去for循环。
5. 实际场景：
   - 为了过滤列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表即可。
   - 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。此时把 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)即可。

## 双向数据绑定

1. vue中双向绑定是一个指令v-model，可以绑定一个动态值到视图，同时视图中变化能改变该值。v-model是语法糖，默认情况下相当于:value和@input。

2. 使用v-model可以减少大量繁琐的事件处理代码，提高开发效率，代码可读性也更好

4. 原生的表单项可以直接使用v-model，自定义组件上如果要使用它需要在组件内绑定value并处理输入事件

5. 做过测试之后发现，输出包含v-model模板的组件渲染函数，会被转换为value属性的绑定以及一个事件监听，事件回调函数中会做相应变量更新操作。

## 响应式原理

   vue.js 采用数据劫持结合发布-订阅模式,通过 Object.defineproperty 来劫持各个属性的 setter,getter,
​   在数据变动时发布消息给订阅者,触发 响应的监听回调
<img src="http://yangwenxu.cn/assets/images/vue-reactive.png" alt="vue-reactive" style="zoom: 80%;" />


### 核心实现类:

1. Observer : 它的作用是给对象的属性添加 getter 和 setter，用于依赖收集和派发更新

2. Dep : 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个 Dep 实例（里面 subs 是 Watcher 实例数组）,当数据有变更时,会通过 dep.notify()通知各个 watcher。

3. Watcher : 观察者对象 , 实例分为渲染 watcher (render watcher),计算属性 watcher (computed watcher),侦听器 watcher（user watcher）三种

4. Watcher 和 Dep 的关系：watcher 中实例化了 dep 并向 dep.subs 中添加了订阅者,dep 通过 notify 遍历了 dep.subs 通知每个 watcher 更新。

### 依赖收集

1. initState 时,对 computed 属性初始化时,触发 computed watcher 依赖收集
2. initState 时,对侦听属性初始化时,触发 user watcher 依赖收集
3. render()的过程,触发 render watcher 依赖收集
4. re-render 时,vm.render()再次执行,会移除所有 subs 中的 watcer 的订阅,重新赋值。

### 派发更新

1. 组件中对响应的数据进行了修改,触发 setter 的逻辑
2. 调用 dep.notify()
3. 遍历所有的 subs（Watcher 实例）,调用每一个 watcher 的 update 方法。

### 原理总结

1. 所谓数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。

2. mvvm框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。

3. 以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。

4. vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖该数组原型的方法，扩展它的7个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新产生的Map、Set这些数据结构不支持等问题。

5. 为了解决这些问题，vue3重新编写了这一部分的实现：利用ES6的Proxy机制代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，我们甚至不需要引入vue都可以体验。

## vm.$set()实现原理

1.  首先，需要考虑vue能不能直接监测到数组的变化，当然是不能的。但其实object.defineProperty是可以监测到数组的变化，但这个变化也只是数组内部已有元素的变化，还是监测不到数组内部新增元素或属性的变化。但其实vue内部就根本没有用object.defineProperty来检测这种变化(官方是说受到现代JavaScript的限制)，而是把这种监测机制绑定在了改变数组的七种方法上面，执行这些方法就可以让数据变成响应式的。   

2. 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。

3. Vue 如何解决对象新增属性不能响应的问题：

    (1). 如果目标是数组,使用 vue 实现的变异方法 splice 实现响应式
    (2). 如果目标是对象,判断属性存在,即为响应式,直接赋值
    (3). 如果 target 本身就不是响应式,直接赋值
    (4). 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  // target 为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splice()执行有误
    target.length = Math.max(target.length, key);
    // 利用数组的splice变异方法触发响应式
    target.splice(key, 1, val);
    return val;
  }
  // target为对象, key在target或者target.prototype上 且必须不能在 Object.prototype 上,直接赋值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  // 以上都不成立, 即开始给target创建一个全新的属性
  // 获取Observer实例
  const ob = (target: any).__ob__;
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 进行响应式处理
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

## Vue 的渲染过程

  <img src="http://yangwenxu.cn/assets/images/vue-render.png" alt="vue-render" style="zoom: 80%;" />
1. 调用 compile 函数,生成 render 函数字符串 ,编译过程如下:
  - parse 函数解析 template,生成 ast(抽象语法树)
  - optimize 函数优化静态节点 (标记不需要每次都更新的内容,diff 算法会直接跳过静态节点,从而减少比较的过程,优化了 patch 的性能)
  - generate 函数将生成的AST抽象语法树 render成 函数字符串
2. 调用 new Watcher 函数,监听数据的变化,当数据发生变化时，Render 函数执行生成 vnode 对象
3. 调用 patch 方法,对比新旧 vnode 对象,通过 DOM diff 算法,添加、修改、删除真正的 DOM 元素

## vue中key的作用

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

1. key的作用主要是为了更高效的更新虚拟DOM。

2. vue在patch过程中需要判断两个节点是否是同一个节点，这时候主要是判断两者的key和元素类型等，在渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，它的值就是undefined，则可能永远认为这是两个相同节点，哪怕它们实际上不是，也只能去做更新操作，这会导致大量的DOM更新，使得整个patch过程比较低效，影响性能。

3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。


## 虚拟dom，diff算法

1. diff算法是虚拟DOM技术的核心，vue里面主要是patch过程；通过新旧虚拟DOM作对比，将变化的地方转换为DOM操作
2. 在vue 1中是没有patch的，因为界面中每个依赖都有专门的watcher负责更新，这样项目规模变大就会成为性能瓶颈，vue 2中为了降低watcher粒度，每个组件只有一个watcher，但是当需要更新的时候，需要执行patch过程才能精确找到发生变化的地方。
3. watcher会通知更新并执行其更新函数，它会执行渲染函数获取全新虚拟dom：newVnode，此时就会执行patch打补丁过程比对上次渲染结果oldVnode和新的渲染结果newVnode。
4. patch过程遵循深度优先、同层比较的策略；两个节点之间比较时，如果它们拥有子节点，会先比较子节点；比较两组子节点时，会假设头尾节点可能相同先做尝试，没有找到相同节点后才按照通用方式遍历查找；查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

## nextTick的原理

### JS 运行机制

   JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤:

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

​    主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 消息队列中存放的是一个个的任务（task）。task 又分为两大类，分别是 macro task 和 micro task，并且每个 macro task 结束后，都要清空所有的 micro task。

### vue 的 nextTick 方法的实现原理:

1. nextTick是Vue提供的一个全局API，由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获取更新后的dom状态，就需要使用这个方法。nextTick就是传一个回调函数进去，在里面执行dom操作即可。
2. vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
3. nextTick方法会在队列中加入一个回调函数，然后在callbacks里面加入我们传入的函数，在回调函数里面执行dom操作，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这样就能确保该函数在前面的dom操作完成后才调用。
4. 降级策略：microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕，考虑到兼容问题, vue 做了 microtask 向 macrotask 的降级方案，在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout。


## 组件通信

父子组件通信、隔代组件通信、兄弟组件通信。

**（1）`props / $emit` 适用 父子组件通信**

**（2）`ref` 与 `$parent / $children` 适用 父子组件通信**

**（3）`EventBus （$emit / $on）` 适用于 父子、隔代、兄弟组件通信**

**（4）`$attrs`/`$listeners` 适用于 隔代组件通信**

**（5）`provide / inject` 适用于 隔代组件通信**

**（6）Vuex 适用于 父子、隔代、兄弟组件通信**

## vuex状态管理

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

1. vuex是vue专用的状态管理库。它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。

2. vuex主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享，但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，

3. 也会使程序逻辑变得复杂。vuex通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。

4. vuex的理解：首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace，那么在提交mutation和派发action时还需要额外的命名空间前缀。

5. vuex在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

## vue-router路由实现

### hash 模式的实现原理

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。hash 路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）

### history 模式的实现原理

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录。history 路由模式的实现主要基于存在下面几个特性：

 - pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
 - 可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
 - history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

## keep-alive 的实现原理和缓存策略

1. 获取 keep-alive 包裹着的第一个子组件对象及其组件名。

2. 根据设定的 include/exclude（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例

3. 根据组件 ID 和 tag 生成缓存 Key,并在缓存对象中查找是否已缓存过该组件实例。如果存在,直接取出缓存值并更新该 key 在 this.keys 中的位置(**更新 key 的位置是实现 LRU 置换策略的关键**)

4. 在 this.cache 对象中存储该组件实例并保存 key 值,之后检查缓存的实例数量是否超过 max 的设置值,超过则根据 LRU 置换策略**删除最近最久未使用的实例**（即是下标为 0 的那个 key）

5. 最后组件实例的 keepAlive 属性设置为 true,这个在渲染和执行被包裹组件的钩子函数会用到。

## vue3的改动

### 1. 监测机制的改变

  vue3.0 使用代理 Proxy 的 observer 实现，提供全语言覆盖的反应性跟踪。
  这消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：

    - 只能监测属性，不能监测对象
    - 检测属性的添加和删除；
    - 检测数组索引和长度的变更；
    - 支持 Map、Set、WeakMap 和 WeakSet。

### 2. 模板(作用域插槽)

​      模板方面没有大的变更，只改了作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。同时，对于 render 函数的方面，vue3.0 也会进行一系列更改来方便习惯直接使用 api 来生成 vdom 。

### 3. 对象式的组件声明方式

​     vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易。此外，vue 的源码也改用了 TypeScript 来写。其实当代码的功能复杂之后，必须有一个静态类型系统来做一些辅助管理。现在 vue3.0 也全面改用 TypeScript 来重写了，更是使得对外暴露的 api 更容易结合 TypeScript。静态类型系统对于复杂代码的维护确实很有必要。

### 4. composition api代替options api

   避免了上下反复横跳

### 5. vite打包

 在开发环境中可以秒启动，其实是去掉了打包的过程，但在线上环境还是需要webpack打包的。

### 6. 其他方面的更改

vue3.0 的改变是全面的，上面只涉及到主要的 3 个方面，还有一些其他的更改：

- 支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
- 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
- 基于 treeshaking 优化，提供了更多的内置功能。


## vue和react的区别

- **数据是否可变**: react整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流，推崇结合immutable来实现数据不可变; vue的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立Watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom。总之，react的性能优化需要手动去做，而vue的性能优化是自动的，但是vue的响应式机制也有问题，就是当state特别多的时候，Watcher也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用react，更加可控。
- **通过js来操作一切，还是用各自的处理方式**: react的思路是all in js，通过js来生成html，所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等; vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件，可以把html、css、js写到一个文件中，html提供了模板引擎来处理。
- **类式的组件写法，还是声明式的写法**: react是类式的写法，api很少; 而vue是声明式的写法，通过传入各种options，api和参数都很多。所以react结合typescript更容易一起写，vue稍微复杂。
- **扩展不同**: react可以通过高阶组件（Higher Order Components--HOC）来扩展，而vue需要通过mixins来扩展。
- **什么功能内置，什么交给社区去做**: react做的事情很少，很多都交给社区去做，vue很多东西都是内置的，写起来确实方便一些，
  比如 redux的combineReducer就对应vuex的modules，
  比如reselect就对应vuex的getter和vue组件的computed，
  vuex的mutation是直接改变的原始数据，而redux的reducer是返回一个全新的state，所以redux结合immutable来优化性能，vue不需要。


## vuejs的优化策略

### 1. 路由懒加载

  ```js
  const router = new VueRouter({
    routes: [
      { path: '/foo', component: () => import('./Foo.vue') }
    ]
  })
  ```
### 2. keep-alive缓存页面

  ```vue
  <template>
    <div id="app">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </template>
  ```

### 3. 使用v-show复用DOM

  ```vue
  <template>
    <div class="cell">
      <!--这种情况用v-show复用DOM，比v-if效果好-->
      <div v-show="value" class="on">
        <Heavy :n="10000"/>
      </div>
      <section v-show="!value" class="off">
        <Heavy :n="10000"/>
      </section>
    </div>
  </template>
  ```

### 4. v-for 遍历避免同时使用 v-if

  ```vue
  <template>
      <ul>
        <li
          v-for="user in activeUsers"
          :key="user.id">
          {{ user.name }}
        </li>
      </ul>
  </template>
  <script>
  	export default {
          computed: {
            activeUsers: function () {
              return this.users.filter(function (user) {
               return user.isActive
              })
            }
          }
      }
  </script>
  ```

### 5. 长列表性能优化

  - 如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化

    ```js
    export default {
      data: () => ({
        users: []
      }),
      async created() {
        const users = await axios.get("/api/users");
        this.users = Object.freeze(users);
      }
    };
    ```

  - 如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

    ```vue
    <recycle-scroller
      class="items"
      :items="items"
      :item-size="24"
    >
      <template v-slot="{ item }">
        <FetchItemView
          :item="item"
          @vote="voteItem(item)"
        />
      </template>
    </recycle-scroller>
    ```

### 6. 事件的销毁

  Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

  ```js
  created() {
    this.timer = setInterval(this.refresh, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
  ```

### 7. 图片懒加载

  对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。

  ```html
  <img v-lazy="/static/img/1.png">
  ```

### 8. 第三方插件按需引入

  像element-ui这样的第三方组件库可以按需引入避免体积太大。

  ```js
  import Vue from 'vue';
  import { Button, Select } from 'element-ui';
  
   Vue.use(Button)
   Vue.use(Select)
  ```

### 9. 无状态的组件标记为函数式组件

  ```vue
  <template functional>
    <div class="cell">
      <div v-if="props.value" class="on"></div>
      <section v-else class="off"></section>
    </div>
  </template>
  
  <script>
  export default {
    props: ['value']
  }
  </script>
  ```

### 10. 子组件分割

  ```vue
  <template>
    <div>
      <ChildComp/>
    </div>
  </template>
  
  <script>
  export default {
    components: {
      ChildComp: {
        methods: {
          heavy () { /* 耗时任务 */ }
        },
        render (h) {
          return h('div', this.heavy())
        }
      }
    }
  }
  </script>
  ```

### 11. 变量本地化

  ```vue
  <template>
    <div :style="{ opacity: start / 300 }">
      {{ result }}
    </div>
  </template>
  
  <script>
  import { heavy } from '@/utils'
  
  export default {
    props: ['start'],
    computed: {
      base () { return 42 },
      result () {
        const base = this.base // 不要频繁引用this.base
        let result = this.start
        for (let i = 0; i < 1000; i++) {
          result += heavy(base)
        }
        return result
      }
    }
  }
  </script>
  ```


