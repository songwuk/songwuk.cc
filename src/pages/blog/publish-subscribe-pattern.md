---
layout: "../../layouts/BlogPost.astro"
title: "发布订阅模式"
description: "发布订阅者模式（Publish-Subscribe Pattern）是一种常见的设计模式"
tags:
  - Blog
pubDate: "May 9, 2024"
language: 
  - zh
updatedDate: 'May 9, 2024'
---

![20240509-pubsub](/pubsub/20240509-pubsub.png)
### 介绍
<p>发布/订阅模式是一种通用的单向消息传递模式，其中发布者生成数据/消息，订阅者注册以接收特定类型的消息。它可以使用点对点架构或消息代理来实现以调解通信。</p>

在日常生活中，我们有没有类似的经历呢，答案是有的。就比如在你某一天入住到一个酒店，交了400块押金，跟酒店前台说明天早上我有个朋友来找我，到了可以直接打电话给我。这种情况下，你跟酒店说这一动作就是**订阅**，而酒店前台接待就是**事件中心**、明天早上朋友来了喊你就是**发布**.

### 应用场景 

- [x] 1.事件通知：当某个组件发生了变化或者需要通知其他组件时，可以使用发布-订阅模式。例如，在一个购物车应用中，当用户添加商品到购物车时，可以发布一个“商品已添加”事件，其他页面或组件可以订阅这个事件，以便更新相应的 UI 或执行相关操作。
- [x] 2.消息总线：在大型应用中，可能有多个模块或组件需要进行通信，此时可以使用发布-订阅模式来创建一个消息总线。各个模块可以发布和订阅消息，以实现模块间的解耦和灵活的通信方式。
- [x] 3.全局状态管理：在前端开发中，常常需要管理全局状态，比如用户登录状态、主题切换等。可以使用发布-订阅模式来管理这些全局状态，当状态发生变化时，发布一个事件通知所有订阅者更新状态。
- [x] 4.解耦组件间关系：发布-订阅模式可以帮助解耦组件间的关系，使得各个组件之间更加独立和可维护。例如，一个评论组件可以发布一个“新增评论”事件，其他组件可以订阅这个事件来更新评论列表，而不需要直接调用评论组件的方法。
### 代码
- 简单实现
```js
// 定义事件管理器
class EventManager {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 发布事件
  publish(event, data) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach(callback => {
      callback(data);
    });
  }
}
// 创建事件管理器实例
const eventManager = new EventManager();
// 订阅事件
eventManager.subscribe('userLoggedIn', (data) => {
  console.log('User logged in:', data.username);
});
// 发布事件
eventManager.publish('userLoggedIn', { username: 'JohnDoe' });
```
cd ..
