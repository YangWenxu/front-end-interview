---
title: reactjs-base-interview
tags: react
categories: interview
---

1. 组件：class类组件和hooks函数组件开发
2. context，redux数据状态管理
3. 虚拟dom，fiber架构

<!--more-->

## 生命周期

*1. 初始渲染阶段：*这是组件即将开始其生命之旅并进入 DOM 的阶段。

*2. 更新阶段：*一旦组件被添加到 DOM，它只有在 prop 或状态发生变化时才可能更新和重新渲染。这些只发生在这个阶段。

*3. 卸载阶段：*这是组件生命周期的最后阶段，组件被销毁并从 DOM 中删除。

​	**componentWillMount**：在创建组件之后但在将其渲染到DOM中之前调用
​	**componentDidMount**：在第一个渲染之后调用；组件的DOM元素现在可用
​	**componentWillReceiveProps**：当属性更新时调用
​	**shouldComponentUpdate**：当收到新props时，此方法可以防止重新渲染以优化性能
​	**componentWillUpdate**：在收到新的props并且ComponentUpdate返回true时调用
​	**componentDidUpdate**：在组件更新后调用
​	**componentWillUnmount**：在组件从DOM中移除之前调用，允许您清理事件侦听器之类的

  React v16.3新引⼊了两个新的⽣命周期函 数：
  **getDerivedStateFromProps**，**getSnapshotBeforeUpdate**

  **getDerivedStateFromProps** 会在调⽤ render ⽅法之前调⽤，并且在初始挂载及后续更新时都会被调⽤。它应返回⼀个对象来更新
  state，如果返回 null 则不更新任何内容。

  **getSnapshotBeforeUpdate** 在最近⼀次渲染输出（提交到 DOM 节点）之前调⽤。它使得组件能在发⽣更改之前从 DOM 中 捕获⼀    些信息（例如，滚动位置）。此⽣命周期的任何返回值将作 为参数传递给 componentDidUpdate()。

   V17可能会废弃的三个⽣命周期函数⽤**getDerivedStateFromProps** 替代，⽬前使⽤的话加上UNSAFE_：**componentWillMount**  **componentWillReceiveProps** **componentWillUpdate**

## 类组件和函数式组件

函数组件是无状态的（同样，小于 React 16.8版本），并返回要呈现的输出。它们渲染 UI 的首选只依赖于属性，因为它们比基于类的组件更简单、更具性能。react hooks的出现就是让函数式组件也具有类组件的能力。

## react hooks

​	不需要基于类的组件、生命周期钩子和 this 关键字

​	通过将公共函数抽象到定制钩子中，使重用逻辑变得更容易

​	通过能够将逻辑与组件本身分离出来，使代码更具可读性和可测试性

- useState

- usEffect
	   React Hooks 提供了 Effect Hook，可以在函数组件中执行副作用操作，并且是在函数渲染	DOM完成后执行副作用操作。
	
- useContext

    跨层级组件通讯

    Provider：外层提供数据的组件 

    Consumer ：内层获取数据的组件

- useReducer

- useCallback

- useMemo

- useRef

- useImperativeHandle

- useLayoutEffect

## react的refs

Refs 是 React 中引用的简写。它是一个有助于存储对特定的 React 元素或组件的引用的属性，它将由组件渲染配置函数返回。用于对 render() 返回的特定元素或组件的引用。当需要进行 DOM 测量或向组件添加方法时，它们会派上用场。以下是应该使用 refs 的情况：

- 需要管理焦点、选择文本或媒体播放时
- 触发式动画
- 与第三方 DOM 库集成

## redux

### redux

 ![redux](http://yangwenxu.cn/assets/images/redux.png)


1. createStore: 创建store ，来存储数据
2. reducer: 初始化state并定义state修改规则，修改状态函数
3. getState: 获取状态值
4. dispatch: 提交更新，通过dispatch⼀个action来提交对数据的修改
5. action:  action提交到reducer函数⾥，根据传⼊的action的type，返回新的 state
6. subscribe: 变更订阅

### react-redux

redux与react一起使用时需要手动在组件里通过subscribe监听state的变化并更新组件，这样的话每次都会重新调⽤render和getState，为了解决这样的问题，redux官方提供了react-redux的库，通过connect的方式连接state和react组件，达到自动监听的效果

提供了两个api 

1. Provider 为后代组件提供store

2. connect 为组件提供数据和变更⽅法

connect是一个高阶组件，接收mapStateToProps和mapDispatchToProps参数，其中mapStateToProps的作用是将特定的state映射到组件的props上，mapDispatchToProps将dispatch(action)映射到props上，并在componentDidMount统一进行store的subscribe监听，当state变化时，被connect的所有组件都会进行一次render。

总结：Provider的本质是利用context统一传递，connect本质是将监听和获取state的逻辑进行统一抽取复用，这也是高阶组件的常用功能，被connect的组件变成了UI型组件，只需要从props中获取到状态进行渲染即可。

### redux-thunk，redux-logger

 ![redux-thunk](http://yangwenxu.cn/assets/images/react-thunk.png)

Redux只是个纯粹的状态管理器，默认只⽀持同步，实现异步任务，⽐如延迟，⽹络请求，需要redux-thunk和 redux-logger中间件的⽀持

### redux-saga

 ![redux-saga](http://yangwenxu.cn/assets/images/redux-saga.png)

redux-thunk虽然支持了异步场景，但其存在的缺点也很明显：

1、使用回调的方式来实现异步，容易形成层层回调的面条代码

2、异步逻辑散落在各个action中，难以进行统一管理

因此，出现了redux-saga更强大的异步管理方案，可以代替redux-thunk使用。其特点如下：

1、使用generator的方式实现，更加符合同步代码的风格；

2、统一监听action，当命中action时，执行对应的saga任务，并且支持各个saga之间的互相调用，使得异步代码更方便统一管理。

## react-router

react-router中奉⾏⼀切皆组件的思想，路由器-Router、链接-Link、路由-Route、独占-Switch、重定向-Redirect都以组件形式存在 Route渲染优先级：children>component>render

与HashRouter对⽐： 

1. HashRouter最简单，不需要服务器端渲染，靠浏览器的#的来区分path就可以，BrowserRouter 需要服务器端对不同的URL返回不同的HTML，后端配置可参考。 
2.  BrowserRouter使⽤HTML5历史API（ pushState，replaceState和popstate事件），让⻚⾯的UI 同步与URL。 
3.  HashRouter不⽀持location.key和location.state，动态路由跳转需要通过?传递参数。 
4.  Hash history 不需要服务器任何配置就可以运⾏，比较简单，在实际线上环境中一般用browserHistory，因为每⼀个 web 应⽤都应该渴望使⽤ browserHistory 。

## react虚拟dom怎么执行的(树的遍历和diff)

把树形结构按照层级分解，只比较同级元素。

列表结构的每个单元添加唯一的 key 属性，方便比较。

React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）

合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty 到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.

选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

## fiber架构的描述

- 旧: 浏览器渲染引擎单线程, 计算DOM树时锁住整个线程, 所有行为同步发生, 有效率问题, 期间react会一直占用浏览器主线程，如果组件层级比较深，相应的堆栈也会很深，长时间占用浏览器主线程, 任何其他的操作（包括用户的点击，鼠标移动等操作）都无法执行。
- 新: 重写底层算法逻辑, 引入fiber时间片, 异步渲染, react会在渲染一部分树后检查是否有更高优先级的任务需要处理(如用户操作或绘图), 处理完后再继续渲染, 并可以更新优先级, 以此管理渲染任务. 加入fiber的react将组件更新分为两个时期（phase 1 && phase 2），render前的生命周期为phase1，render后的生命周期为phase2, 1可以打断, 2不能打断一次性更新. 三个will生命周期可能会重复执行, 尽量避免使用。

## react16和15的虚拟dom有什么变化，

## fiber和虚拟dom的区别

fiber把整个虚拟dom树变成了一个链表指向，diff过程可以随时终端

元素 -> 第一个子元素 -> 兄弟元素 -> 兄弟元素

## react事件系统和浏览事件系统有啥区别和关系

## dva+umi

## ant-design + antd-pro的源码