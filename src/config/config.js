import { config } from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' });
} else {
  config({ path: '.env.production' });
}

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  }
};