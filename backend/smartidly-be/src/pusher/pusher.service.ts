import { Injectable, Logger } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;
  private logger = new Logger(PusherService.name);

  constructor() {
    const PUSHER_APP_ID = '1486352';
    const PUSHER_KEY = '7081817b27670ea707ec';
    const PUSHER_SECRET = '54f7fd97849ba927d01c';
    const PUSHER_CLUSTER = 'ap2';

    this.pusher = new Pusher({
      appId: PUSHER_APP_ID,
      key: PUSHER_KEY,
      secret: PUSHER_SECRET,
      cluster: PUSHER_CLUSTER,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    this.logger.log(
      `Triggering event ${event} to channel ${channel} with data ${JSON.stringify(data)}`,
    );
    return this.pusher.trigger(channel, event, data);
  }

  authenticate(channel: string, socketId: string) {
    return this.pusher.authorizeChannel(channel, socketId);
  }
}
