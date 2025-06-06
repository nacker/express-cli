import {Sequelize} from "sequelize";
import config from "./config";

const sequelize = new Sequelize({
  dialect: config.db.dialect || 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database
});

export default sequelize;
