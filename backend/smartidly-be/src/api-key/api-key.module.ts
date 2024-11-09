import { Module } from '@nestjs/common';
import { ApiKeyDao } from './api-key.dao';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ApiKeyDao],
  exports: [ApiKeyDao],
})
export class ApiKeyModule {}
