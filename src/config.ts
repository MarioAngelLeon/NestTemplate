import * as dotenv from 'dotenv';
dotenv.config();

export const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || '';
export const DB_TYPE = process.env.DB_TYPE || 'mysql';
export const DB_HOST = process.env.DB_HOST || '';
export const DB_PORT = process.env.DB_PORT || '';
export const DB_USER = process.env.DB_USER || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || '';
export const DB_SYNC = (process.env.DB_SYNC || '').toUpperCase() === 'TRUE';

export const config = () => ({
  port: Number(process.env.PORT),
  global_prefix: GLOBAL_PREFIX,
  database: {
    type: DB_TYPE,
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: DB_SYNC,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  },
});
