# Express Scaffold

基于Node.js的现代化API开发脚手架，集成最佳工程实践

## 功能特性

✅ JWT身份验证  
✅ Redis缓存系统  
✅ MySQL数据库集成  
✅ Swagger API文档  
✅ Winston日志系统  
✅ 多环境配置管理  
✅ 健康检查端点  
✅ 压力测试脚本

## 目录结构

```
├── src/
│   ├── config/       # 环境配置
│   ├── middlewares/  # 认证中间件
│   ├── routes/       # API路由
│   └── utils/        # 工具模块
├── test/             # 测试脚本
├── .env.*            # 环境变量
└── package.json      # 项目配置
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动本地服务（需预先安装MySQL和Redis）
mysql.server start
redis-server --daemonize yes
npm run dev
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

## 贡献指南

1. 创建特性分支
2. 提交代码变更
3. 创建Pull Request

## 许可证

[MIT License](LICENSE)