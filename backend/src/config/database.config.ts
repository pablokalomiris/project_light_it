import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './types';

export default registerAs<DatabaseConfig>('database', () => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  name: process.env.POSTGRES_DB ?? 'mydb',
}));
