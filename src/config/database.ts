import { Sequelize } from 'sequelize';
import dotenv = require('dotenv');

dotenv.config();

const envMissing = (env: string): string => {
  throw `Missing ${env} variable`;
};

export const sequelize = new Sequelize(
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
