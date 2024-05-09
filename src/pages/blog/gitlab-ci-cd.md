---
layout: "../../layouts/BlogPost.astro"
title: "gitlab、gitlab-runner、docker"
description: "gitlab、gitlab-runner、docker deploy on windows 10"
tags:
  - Blog
pubDate: "Nov 3, 2022"
language: 
  - zh
updatedDate: 'Nov 3, 2022'
---

记录在windows10下安装 gitlab 并且运行成功运行gitlab-runner


## 1. 下载 docker
- windows -> [下载](https://docs.docker.com/desktop/install/windows-install/)
- macos -> [下载](https://docs.docker.com/desktop/install/mac-install/)
- linux -> [下载](https://docs.docker.com/desktop/install/linux-install/)

## 2. 安装 gitlab docker images
使用以下命令就可以安装

```sh
docker run --detach \
 --env DOCKER_HOST=tcp://docker:2376 \
 --env DOCKER_CERT_PATH=/certs/client \
 --env DOCKER_TLS_VERIFY=1 \
 --hostname gitlab.example.com \
 --publish 443:443 --publish 80:80 --publish 22:22 \
 --name gitlab \
 --restart always \
 -v gitlab-config:/etc/gitlab \
 -v gitlab-logs:/var/log/gitlab \
 -v gitlab-data:/var/opt/gitlab \
 --shm-size 256m \
 gitlab/gitlab-ee:latest
```
### 注释
- `--env` 定义环境变量的
- `--hostname` 绑定你的域名(本地开发为你的本地ip)
- `--publish` 端口号映射
- `--name` docker 启动的name
- `--restart` 重新启动时 
- `-v` --volume 管理卷
- `--shm-size` 共享内存定义大小
### 安装完成
等安装好了,打开你本地的ip访问应该会出现下面这个页面👇🏻(刷新下)

![docker-gitlab-index](/docker-gitlab/docker-gitlab-index.png)


### 获取密码

```sh
docker exec -it gitlab bash
cat /etc/gitlab/initial_root_password
```
`warn: 密码24小时之后就会自动删除,建议提前更改或者保存下来` <br>

到这一步你的gitlab就算安装完成了，是不是很简单`->`

## 3. 安装 gitlab-runner docker image

### 推荐使用docker volumes 启动 runner container
使用管理员模式打开下面代码👇🏻
```sh
docker run -d --name gitlab-runner --restart always -v gitlab-runner-config:/etc/gitlab-runner -v /var/run/docker.sock:/var/run/docker.sock gitlab/gitlab-runner
```
### 启动好了runner,我们需要register to runner
```sh
docker run --rm -it -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner register
```

- 1.输入gitlab的地址(本地请填写ip)
- 2.输入获取的token注册runner
- 3.输入runner的描述
- 4.输入runner的tags
- 5.输入runner的维护说明
- 6.提供一个runner的执行方式
- ~7.如果在runner的执行中输入docker 系统会要你输入在`.gitlab-ci.yml`中使用的默认镜像
end 

### 你的第一个gitlab-runner 就注册好了，接下来你就可以在gitlab看到实际效果
![docker-gitlab-runner-image](/docker-gitlab/docker-gitlab-runner-image.png)
![docker-gitlab-runner-image-pipelines](/docker-gitlab/docker-gitlab-runner-image-pipelines.png)
这里有很多详细的配置[`.gitlab-ci.yml`](https://gitlab.com/gitlab-org/gitlab-foss/tree/master/lib/gitlab/ci/templates)


## 总结
刚开始在本地配置ip的时候翻车了，找了好多资料，最终才发现不能绑定localhost，只能用ip绑定runner，
还在获取密码的时候翻车了，通过官方的例子无法获取，无奈只能进入到镜像内部 cat获取了，至此我的gitlab-runner的安装工作完成了。


