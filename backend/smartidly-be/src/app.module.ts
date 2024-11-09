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
import { AccountsModule } from './accounts/accounts.module';
import { EmailServiceModule } from './email-service/email-service.module';
import { PusherModule } from './pusher/pusher.module';
import { OrdersModule } from './orders/orders.module';
import { MenusModule } from './menus/menus.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UsersModule,
    DbModule,
    ApiKeyModule,
    AccountsModule,
    EmailServiceModule,
    PusherModule,
    OrdersModule,
    MenusModule,
    MenuItemsModule,
    IngredientsModule,
  ],
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
