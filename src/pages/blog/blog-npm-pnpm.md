---
layout: "../../layouts/BlogPost.astro"
title: "npm vs pnpm"
description: "why I use pnpm?"
tags:
  - Blog
pubDate: "Oct 4, 2022"
language: 
  - zh
updatedDate: 'Oct 5, 2022'
---

[pnpm](https://github.com/pnpm/pnpm)是 Node.js 的替代包管理器。 它是 npm 的直接替代品，但速度更快、效率更高。<br>

为什么更高效,当你安装一个包时,他将安装到你当前所在目录上,之后我们会创建一个`hard link`而不是复制,
对于每个模块的每个版本我们只保存一个副本,如果你在npm中有100个使用lodash的包,磁盘中就会有100个副本，使用pnpm就可以解决臃肿的问题

因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

### 相同的例子在pnpm中是这样的

```

├── foo
│   ├── node_modules
│   │   ├── dayjs@1.11.5 ----> Symoblic Link
│   ├── package.json
├── node_modules
│   ├── .pnpm
│   │   ├── dayjs@1.11.5
│   │   │   ├── node_modules -----this
│   ├── dayjs@1.11.5 ----> Symoblic Link
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

在上述中的foo包中有个`dayjs`的库,在内部中都指向了`.pnpm`中的`dayjs` node_modules.
所以在实现的时候能极大的节省硬盘的容量,在pnpm中会使所有依赖项保持平坦，使用符号链接将它们组合在一起,
`foo`所有已安装的软件包都不在自己的目录里,并且没有自己的 node_modules 而是在`root`node_modules下
##

### 在npm中
就会有多个`dayjs`的node_modules的文件,无法对相同的重复利用,如果项目的依赖过多，会统一在`root`的node_modules下
出现,就可能会出现依赖的bug

### 最后
[图片出处](https://twitter.com/xiaokedada/status/1471691763102679041/photo/1)


![photo](https://pbs.twimg.com/media/FGx92b4aUAEAfn5?format=jpg&name=4096x4096)





