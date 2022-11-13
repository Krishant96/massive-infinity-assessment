import { DataTypes, UUIDV4 } from 'sequelize';
import * as Sequelize from 'sequelize';
import dotenv = require('dotenv');
import { sequelize } from '../config/database';

dotenv.config();

export interface UserCreateModel {
  id?: string;
  email: string;
  hash: string;
  salt: string;
  role: string;
  status: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserCreateModel> {
  id: string;
  email: string;
  hash: string;
  salt: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: string;
  email: string;
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database: ', error);
  });

export const User = sequelize.define<UserModel, UserCreateModel>('users', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('superadmin', 'admin', 'user'),
  },
  status: {
    type: DataTypes.ENUM('active', 'deactive'),
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Users table created successfully!');
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });
