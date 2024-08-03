import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,
  dbName: process.env.DB_Name,
  nodeEnv: process.env.NODE_ENV,
};
