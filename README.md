# HobbyCircle-后端部分

> HobbyCircle -项目后端部分使用 TypeScript 编写，提供了各种 API 服务用于支持前端应用的功能。该后端部分包括控制器、服务、实体、过滤器等模块，旨在构建一个功能完整的社交圈子平台。

## 项目目录结构

- `src/` - 源代码目录

- `config/` - 配置文件目录
  - `config.default.ts` - 默认配置文件
  - `config.unittest.ts` - 单元测试配置文件
- `controller/` - 控制器目录
  - `auth.controller.ts` - 认证控制器
  - `circle.controller.ts` - 圈子控制器
  - `comment.controller.ts` - 评论控制器
  - `home.controller.ts` - 主页控制器
  - `image.controller.ts` - 图片控制器
  - `inf.controller.ts` - 信息控制器
  - `post.controller.ts` - 帖子控制器
  - `user.controller.ts` - 用户控制器
- `entity/` - 实体目录
  - `circle.entity.ts` - 圈子实体
  - `comment.entity.ts` - 评论实体
  - `image.entity.ts` - 图片实体
  - `inf.ts` - 信息实体
  - `post.entity.ts` - 帖子实体
  - `user.entity.ts` - 用户实体
- `exception/` - 异常处理目录
  - `business.error.ts` - 业务异常
- `filter/` - 过滤器目录
  - `default.filter.ts` - 默认过滤器
  - `global.filter.ts` - 全局过滤器
  - `notfound.filter.ts` - 404 过滤器
- `image/` - 图片处理目录
  - `helper.ts` - 图片辅助功能
- `service/` - 服务目录
  - `auth.service.ts` - 认证服务
  - `image.service.ts` - 图片服务
  - `inf.service.ts` - 信息服务
  - `user.service.ts` - 用户服务
- `configuration.ts` - 配置文件

## 技术栈

- **TypeScript** - 静态类型的 JavaScript 超集，用于编写更具可维护性的代码
- **MidwayJS** - 基于 Koa 的 Node.js 框架，用于构建高效、可扩展的服务端应用
- **Koa** - Web 应用框架，用于处理 HTTP 请求
- **TypeORM** - TypeScript 的 ORM 库，用于与数据库交互
- **MySQL** - 关系型数据库（使用 `mysql` 和 `mysql2` 连接）
- **bcryptjs** - 密码加密
- **jsonwebtoken** - JSON Web Token (JWT) 处理
- **koa-body** - 处理请求体
- **Jest** - JavaScript 测试框架
- **Supertest** - 测试 HTTP 请求

## **使用指南（项目运行方式）**

完成了项目构建，未打包成 exe(~~技术有限且时间来不及了~~)(~~构建未遂~~)

在项目目录下(/backend)命令行运行：npm run start

由于数据库中图片的存储方式采用的是存储服务端的相对路径，所以不要删除/dsit/image 下的内容,否则会影响程序的运行
