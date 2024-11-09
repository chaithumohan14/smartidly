import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      inject: [DbService],
      useFactory: (dbService: DbService) => dbService.getDbConfig(),
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
