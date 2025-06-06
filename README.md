# Express Scaffold API 脚手架项目说明

> 基于 Express 的标准化后端开发脚手架，集成 JWT 认证、Swagger 文档、Redis 缓存和 Sequelize ORM 数据库操作。

## 功能特性

✅ JWT身份验证  
✅ Redis缓存系统  
✅ MySQL数据库集成  
✅ Swagger API文档  
✅ Winston日志系统  
✅ 多环境配置管理  
✅ 健康检查端点  
✅ 压力测试脚本

## 🧩 技术栈

- **Node.js** (v18+)
- **Express.js** - Web 框架
- **Sequelize** - ORM 数据库操作
- **MySQL** - 默认数据库（可扩展支持 PostgreSQL / MongoDB）
- **JWT** - 用户身份认证
- **Redis** - 接口缓存与 Token 管理
- **Swagger UI** - 自动化 API 文档
- **Winston** - 日志记录
- **统一响应封装** - `ApiResponse`

## 📁 目录结构

```bash
express-cli/
├── src/                # 核心源码目录
│   ├── config/           # 配置文件（数据库、环境变量等）
│   ├── controllers/      # 控制器逻辑
│   ├── middlewares/      # 中间件（如 JWT 认证）
│   ├── models/           # 数据库模型定义
│   ├── routes/           # 路由配置与 Swagger 注释
│   ├── utils/            # 工具类（JWT、Redis、日志、响应封装）
│   └── app.js            # 应用入口
├── logs/               # 日志输出目录
├── sql/                # 初始化 SQL 脚本（可选）
├── .env.*              # 环境配置文件
├── package.json        # 项目依赖与脚本
└── README.md           # 当前文档
```

## 🛠️ 功能模块

### ✅ 用户管理模块

| 接口         | 方法 | 描述             | 是否需要认证 |
|--------------|------|------------------|---------------|
| `/register`  | POST | 用户注册         | 否            |
| `/login`     | POST | 用户登录         | 否            |
| `/api/users` | GET  | 获取所有用户列表 | 是            |

- 支持 Bearer Token 认证访问受保护接口
- 使用 Redis 缓存 Token 及用户数据

## 🔐 环境配置

请在 `.env.development`, `.env.production`, `.env.test` 中设置以下参数：

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
MYSQL_HOST=your_mysql_host_here
MYSQL_PORT=your_mysql_port_here
MYSQL_USER=your_mysql_username_here
MYSQL_PASSWORD=your_mysql_password_here
MYSQL_DB_NAME=your_database_name_here
REDIS_HOST=your_redis_host_here
REDIS_PORT=your_redis_port_here
```

## 📚 API 文档

访问 http://localhost:3000/api-docs 查看完整的 RESTful API 接口文档。支持在线调试与请求测试。

- 使用 `bearerAuth` 设置 JWT Token 进行认证测试
- 所有接口返回统一格式：

```json
{
  "code": 200,
  "message": "Success",
  "data": { /* 接口返回数据 */ }
}
```

## 📈 开发规范

### ✅ 日志记录

- 所有日志输出至 `logs/combined.log`
- 使用 `createLogger(moduleName)` 创建模块专属日志实例

### ❌ 错误处理

- 所有异常通过 `ApiResponse.error(res, code, message)` 统一返回
- 支持全局错误中间件捕获未处理异常

### 📦 响应格式

使用 `ApiResponse.success(res, data)` 和 `ApiResponse.error(res, code, message)` 统一封装响应结果

## 🚀 启动方式

### 开发模式（带热重载）

```bash
npm run dev
```

### 生产模式

```bash
npm start
```

## 📦 依赖安装

```bash
npm install
```

## 环境配置

复制示例文件并配置：
```bash
cp .env.development .env
```

## API文档

访问地址：http://localhost:3000/api-docs


## 测试验证
```bash
# 运行压力测试
npm install -g artillery
artillery run test/loadTest.js
```

## 📝 附加说明

- 数据库迁移建议使用 Sequelize CLI 工具管理
- 可扩展支持更多模块（如角色权限、文件上传等）
- 支持 TypeScript 改造（当前为 JavaScript 版）

---

欢迎基于此模板进行二次开发或功能扩展！
