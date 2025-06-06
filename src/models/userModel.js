import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: 'uk_username'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: 'uk_email'
  },
  hashed_password: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: 'uk_phone'
  }
}, {
  tableName: 'users', // 显式指定表名
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  comment: '用户表，存储用户基本信息'
});

export { User };
