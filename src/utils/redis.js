import Redis from 'ioredis';
import config from '../config/config.js';

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  retryStrategy: (times) => Math.min(times * 100, 3000)
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redis;