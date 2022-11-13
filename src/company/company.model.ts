import { DataTypes, UUIDV4 } from 'sequelize';
import * as Sequelize from 'sequelize';
import dotenv = require('dotenv');
import { sequelize } from '../config/database';

dotenv.config();

export interface CompanyCreateModel {
  id?: string;
  name: string;
  email: string;
  website: string;
  status: string;
}

export interface CompanyModel
  extends Sequelize.Model<CompanyModel, CompanyCreateModel> {
  id: string;
  name: string;
  email: string;
  website: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyViewModel {
  id: string;
  name: string;
  email: string;
  website: string;
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database: ', error);
  });

export const Company = sequelize.define<CompanyModel, CompanyCreateModel>(
  'companies',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
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
    console.log('Companies table created successfully!');
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });
