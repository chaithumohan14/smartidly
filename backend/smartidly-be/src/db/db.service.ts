import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DbService {
  getDbConfig(): DataSourceOptions {
    return {
      type: 'postgres', // Change to 'mysql' or 'sqlite' if needed
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'smartidly',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    };
  }

  async getManager() {
    const dataSource = new DataSource(this.getDbConfig());
    await dataSource.initialize();
    return dataSource.manager;
  }
}
