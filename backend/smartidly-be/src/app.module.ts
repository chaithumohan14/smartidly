import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { APP_GUARD } from '@nestjs/core';
import { SmartidlyAuthGuard } from './auth/auth.guard';

@Module({
  imports: [CommonModule, AuthModule, UsersModule, DbModule, ApiKeyModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SmartidlyAuthGuard,
    },
  ],
})
export class AppModule {}
