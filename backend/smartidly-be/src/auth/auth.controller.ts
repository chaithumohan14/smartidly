import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { IRequestDetails, RequestDetails } from './request-details.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // @Public()
  // @Post('register')
  // async register(@Body() body: UsersTable) {
  //   return this.authService.register(body);
  // }

  @Post('logout')
  async logout(@RequestDetails() requestDetails: IRequestDetails) {
    return this.authService.logout(requestDetails);
  }
}
