import { registerAs } from '@nestjs/config';
import { AppConfig } from './types';

export default registerAs<AppConfig>('app', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) ?? 'development',
}));
