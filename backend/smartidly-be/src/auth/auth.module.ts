import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { DbModule } from 'src/db/db.module';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { AuthStrategy } from './auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService],
  imports: [UsersModule, DbModule, ApiKeyModule],
})
export class AuthModule {}