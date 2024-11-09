import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { DbModule } from 'src/db/db.module';
import { SessionDao } from './session.dao';

@Module({
  providers: [SessionService, SessionDao],
  controllers: [SessionController],
  imports: [DbModule],
  exports: [SessionService, SessionDao],
})
export class SessionModule {}
