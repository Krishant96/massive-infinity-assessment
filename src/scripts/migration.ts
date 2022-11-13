import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import dotenv = require('dotenv');

dotenv.config();

const envMissing = (env: string): string => {
  throw `Missing ${env} variable`;
};

const sequelize = new Sequelize(
  process.env.DB_NAME || envMissing('DB_NAME'),
  process.env.DB_USER || envMissing('DB_USER'),
  process.env.DB_PASSWORD || envMissing('DB_PASSWORD'),
  {
    host: process.env.DB_HOST || envMissing('DB_HOST'),
    dialect: 'mysql',
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database: ', error);
  });

sequelize.define('users', {
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

sequelize.define('companies', {
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
  logo: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('active', 'deactive'),
  },
});

sequelize.define('employees', {
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
});

sequelize
  .sync()
  .then(() => {
    console.log('2 test tables created successfully!');
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });
