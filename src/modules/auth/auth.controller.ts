import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DoctorService } from '../doctor/doctor.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private doctorService: DoctorService,
  ) { }
  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) { }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
