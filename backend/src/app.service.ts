import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './config/types';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getDbConfig(): DatabaseConfig {
    const dbConfig = this.config.get<DatabaseConfig>('database');
    if (!dbConfig) throw new Error('Database config is missing');
    return dbConfig;
  }

  healthCheck(): { status: string; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
