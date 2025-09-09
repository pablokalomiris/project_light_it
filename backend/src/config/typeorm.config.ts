import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '../.env.local') });
dotenv.config({ path: join(process.cwd(), '../.env') });

export default new DataSource({
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'production'
      ? 'db'
      : (process.env.DB_HOST ?? 'localhost'),
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env.POSTGRES_DB ?? 'mydb',
  entities: [join(process.cwd(), 'src', '**', '*.entity{.ts,.js}')],
  migrations: [join(process.cwd(), 'migrations', '*{.ts,.js}')],
});
