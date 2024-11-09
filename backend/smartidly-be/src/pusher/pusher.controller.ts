import { Body, Controller, Post } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService) {}

  @Post('trigger')
  trigger(@Body() body: any) {
    return this.pusherService.trigger(body.channel, body.event, body.data);
  }

  @Post('authenticate')
  authenticate(@Body() body: any) {
    return this.pusherService.authenticate(body.channel, body.socket_id);
  }
}
