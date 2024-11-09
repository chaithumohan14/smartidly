import { Module } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersDao, UsersService],
  exports: [UsersDao, UsersService],
  imports: [DbModule],
  controllers: [UsersController],
})
export class UsersModule {}
