import { DataTypes, UUIDV4 } from 'sequelize';
import * as Sequelize from 'sequelize';
import dotenv = require('dotenv');
import { sequelize } from '../config/database';

dotenv.config();

export interface EmployeeCreateModel {
  id?: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
}

export interface EmployeeModel
  extends Sequelize.Model<EmployeeModel, EmployeeCreateModel> {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeViewModel {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database: ', error);
  });

export const Employee = sequelize.define<EmployeeModel, EmployeeCreateModel>(
  'employees',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('active', 'deactive'),
    },
  },
);

sequelize
  .sync()
  .then(() => {
    console.log('Employee table created successfully!');
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });
