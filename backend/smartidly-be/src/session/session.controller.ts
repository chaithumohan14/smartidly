import { Body, Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionDetails } from 'src/auth/session-details.decorator';
import { Public } from 'src/auth/public.decorator';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Public()
  async createSession(@Body() body: { qrToken: string }) {
    return this.sessionService.createNewSession(body.qrToken);
  }

  @Get()
  async getSession(@SessionDetails() sessionDetails: SessionDetails) {
    return sessionDetails;
  }
}
