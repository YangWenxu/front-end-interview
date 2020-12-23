---
title: web前端面试
date: 2020-11-19 15:45:33
categories: interview
tags: interview
---

任何好学的技能，都不是那么值钱。
全情投入，专注极致，刻意练习，守正出奇，未闻花名，愿等花开
以能造出什么样的轮子，来衡量学习的效果

<!--more-->

## css基础

1. 行内元素和块状元素

2. position

3. 盒子模型

4. 高度塌陷，清除浮动

5. BFC块级格式化上下文

6. 实现一个水平垂直居中

7. 层叠上下文

8. 三栏布局

9. flex布局

   1. flex布局的相关用法
   2. 如何用flex实现九宫格布局
   3. flex:1指的是什么
   4. flex容器container的相关属性
   5. flex项目item的相关属性

10. 1px

    1. 移动端1px问题是怎么解决的
    2. 介绍一下rem方案和vw方案，分别有什么优点和缺点
    3. rem方案的font-size是挂在哪的
    4. rem方案时移动端字体是怎么处理的

11. 移动端适配

12. 重绘回流，如何避免

13. 预处理语言sass和less

## JavaScript基础

1. 执行上下文，作用域链，闭包

   1. JavaScript的执行上下文
   2. JavaScript的作用域链
   3. JavaScript强大的闭包应用场景

2. 垃圾回收机制

   1. 新生代
   2. 老生代
   3. 标记清除
   4. 标记压缩
   5. 引用计数

3. this, call, apply,bind

   1. 变幻莫测的this指向
   2. 如何改变this指向
   3. call，apply，bind的区别
   4. 如何实现call和apply
   5. 手写一个bind

4. 原型，继承

   1. 原型和原型链
   2. 实现一个继承，

5. promise及异步

   1. 手写并实现一个promise
   2. async 和await
   3. 实现一个sheep函数

6. 深浅拷贝

   1.  介绍js的深浅拷贝
   2.  如何实现深浅拷贝
   3. 实现深拷贝需要注意哪些问题
   4. 如何解决循环引用的问题

7. 事件机制，Event Loop

   1. 如何实现一个事件的发布订阅
   2. 事件循环机制
   3. 宏认为和微任务的区别

8.  函数式编程

   1. 函数柯里化
   2. 数组扁平化
   3. 防抖与节流
   4. 高阶函数

9. service worker和web worker

10. ES6的语法

##  vue框架使用和源码原理

1. 生命周期

2. 组件中 data 为什么是一个函数？

3. computed和watch的区别

4. v-if,v-show,v-html的原理

5. v-if和v-for的优先级

6. 双向数据绑定

7. 响应式原理

8. vm.$set()实现原理

9. Vue 的渲染过程

10. vue中key的作用

11. 虚拟dom，diff算法

12. nextTick的原理

13. 组件通信

14. vuex状态管理

15. vue-router路由实现

16. keep-alive 的实现原理和缓存策略

17. vue3的改动

18. vue和react的区别

19. vuejs的优化策略

## react框架使用与源码原理

1. react虚拟dom怎么执行的(树的遍历和diff)

2. react16和15的虚拟dom架构有什么变化，fiber架构的描述

    fiber把整个虚拟dom树变成了一个链表指向，diff过程可以随时终端

    元素 -> 第一个子元素 -> 兄弟元素 -> 兄弟元素

3. fiber和虚拟dom的区别

4. react16的hooks到底是怎么执行的，react事件系统和浏览事件系统有啥区别和关系

5. react-router原理

6. react怎么实现ssr框架

7. ant-design + antd-pro的源码

8. redux生态 （redux react-redux, redux-sage dva, umi)

## 浏览器网络

1. 重绘与回流

2. 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？

3. cookie与session，localStorage 与 sessionStorage

4. 跨域，预检请求，同源策略

5. 浏览器的缓存机制

6. http和https

7. http头部，状态码

8. https的加密算法

9. http1.0，http1.1, http2.0, http3.0

10. get请求与post请求

11. 正向代理和反向代理

12. tcp连接的三次握手与四次挥手

## 性能优化

1. 代码执行更快
2. 网络传输更快
3. 文件加载更快
4. webpack性能优化

## 设计模式

1. 单例模式
2. 策略模式
3. 代理模式
4. 发布订阅模式(观察者模式)

## 算法与数据结构

1. 斐波拉契数列，爬楼梯问题，递归
2. 排序算法，冒泡排序，选择排序，快速排序
3. 二叉树，二叉树的查找与遍历
4. 贪心算法： 局部最优解法，经典背包问题
5. 分治算法：分而治之
6. 动态规划：每个状态都是过去历史的一个总结
7. 回溯法：现原先选择不优时，退回重新选择