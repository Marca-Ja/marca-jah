import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { GoogleStrategy } from '../../infra/google.strategy';
import { PrismaModule } from '../../infra/prisma.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HttpModule } from '@nestjs/axios';
import { GoogleTokenValidation } from 'src/guards/googleTokenValidation.guard';
import { TwilioModule } from 'src/infra/twilio/twilio.module';
import { TwilioService } from 'src/infra/twilio/twilio.service';

@Module({
  imports: [PrismaModule, HttpModule, TwilioModule],
  controllers: [DoctorController],
  providers: [
    DoctorService,
    GoogleStrategy,
    AuthService,
    JwtService,
    UserService,
    GoogleTokenValidation,
    TwilioService,
  ],
})
export class DoctorModule {}
