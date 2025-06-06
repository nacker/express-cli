import {Sequelize} from "sequelize";
import config from './config.js'; // 确认扩展名已正确

const sequelize = new Sequelize({
  dialect: config.db.dialect || 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database
});

export default sequelize;
