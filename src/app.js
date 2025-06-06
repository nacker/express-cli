import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config.js';
import { createLogger } from './utils/logger.js';
import swaggerDocs from './utils/swagger.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const logger = createLogger('app');

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 健康检查路由
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务
// 路由配置
app.use('/api/users', userRoutes);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  swaggerDocs(app, config.port);
});