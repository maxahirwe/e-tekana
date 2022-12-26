import { config } from 'dotenv';

config();

export const development = {
  database: process.env.DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
  logging: true,
};
export const test = {
  database: process.env.DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
  logging: false,
};
export const production = {
  database: process.env.DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
  logging: false,
};
