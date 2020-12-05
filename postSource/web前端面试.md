---
title: web前端面试
date: 2020-11-19 15:45:33
categories: interview
tags: interview
---

任何好学的技能，都不是那么值钱

以能造出什么样的轮子，来衡量学习的效果

<!--more-->



## 1. JavaScript基础

1. ### 执行上下文，作用域链，闭包

   1. JavaScript的执行上下文
   2. JavaScript的作用域链
   3. JavaScript强大的闭包应用场景

2. ### this, call, apply,bind

   1. 变幻莫测的this指向
   2. 如何改变this指向
   3. call，apply，bind的区别
   4. 如何实现call和apply
   5. 手写一个bind

3. ### 原型，继承

   1. 原型和原型链
   2. 实现一个继承，

4. ### promise及异步

   1. 手写并实现一个promise
   2. async 和await
   3. 实现一个sheep函数

5. ### 深浅拷贝

   1.  介绍js的深浅拷贝
   2.  如何实现深浅拷贝
   3. 实现深拷贝需要注意哪些问题
   4. 如何解决循环引用的问题

6. ### 事件机制，Event Loop

   1. 如何实现一个事件的发布订阅
   2. 事件循环机制
   3. 宏认为和微任务的区别

7. ### 函数式编程

8. ### service worker和web worker

9. ### ES6的语法

## 2. css基础

1. ### 行内元素和块状元素

2. ### position

3. ### 实现一个水平垂直居中

4. ### flex布局

   1. flex布局的相关用法
   2. 如何用flex实现九宫格布局
   3. flex:1指的是什么， flex属性默认值是什么
   4. 分别介绍一下flex-shrink和flex-basis属性
   5. grid布局

5. ### 1px

   1. 移动端1px问题是怎么解决的
   2. 介绍一下rem方案和vw方案，分别有什么优点和缺点
   3. rem方案的font-size是挂在哪的
   4. rem方案时移动端字体是怎么处理的

6. ### 重绘回流，如何避免

7. ### 层叠上下文，z-index

8. ### 预处理语言sass和less

## 3. 性能优化

### 1. 从输入url到页面显示，发生了什么

1. 域名， ip地址，dns协议
2. 建立TCP链接，发请求
3. 后端接受请求，读文件，读数据库，获取网络接口，最终返回想要的数据和页面
4. 前端接受html渲染页面

   1. html =>dom

   2. css=> css tree

   3. dom + css tree => rending tree

   4. 渲染页面
  5. 执行js

### 2. 文件加载更快

1. 缓存，dns, tcp,
   1. webpack打包的文件名_hash.js的方式，为啥是这样的
      1. 文件名？_h=hash 的方式和上面的区别是啥，
      2. 静态资源在cdn上，先部署模板html，还是先部署静态资源
2. 打包， 压缩
3. 负载均衡

### 3. 代码执行更快

1. vue react
2. 虚拟列表
3. ssr

## 4. 工程化

## 5. react框架使用与源码原理

1. ### react虚拟dom怎么执行的(树的遍历和diff)

2. ### react16和15的虚拟dom架构有什么变化，fiber架构的描述

    fiber把整个虚拟dom树变成了一个链表指向，diff过程可以随时终端

    元素 -> 第一个子元素 -> 兄弟元素 -> 兄弟元素

3. ### fiber和虚拟dom的区别

4. ### react16的hooks到底是怎么执行的，react事件系统和浏览事件系统有啥区别和关系

5. ### react-router原理

6. ### react怎么实现ssr框架

7. ### ant-design + antd-pro的源码

8. ### redux生态 （redux react-redux, redux-sage dva, umi)

## 6. vue框架使用和源码原理

1. ### 组件化 + element-ui
2. ### v-if到底是怎么执行的
   
   1. v-if是经过编译的，就是一个三元表达式
   2. template都是编译成render函数执行的
3. ### vue源码 vue3
   
   1. vue1响应式，一个数据表变了，就会通知修改
   2. 虚拟dom是什么，数据变了，虚拟dom的diff算法和patch过程
   3. 虚拟dom和响应式是怎么配合的
4. ### vue的虚拟dom和react虚拟dom有什么区别
5. ### vuex
6. ### vue-router
7. ### nuxtjs和nextjs的ssr

## 7. 计算机基础

1. ### 算法与数据结构
2. ### 计算机网络及协议
3. ### 编译原理
4. ### 设计模式
   
   1. 设计模式需要大量实践和经验去体会
   2. 单利，发布订阅模式