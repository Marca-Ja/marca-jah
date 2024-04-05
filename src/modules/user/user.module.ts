import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from '../doctor/doctor.service';
import { TwilioModule } from 'src/infra/twilio/twilio.module';
import { TwilioService } from 'src/infra/twilio/twilio.service';

@Module({
  imports: [PrismaModule, TwilioModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, DoctorService, TwilioService],
  exports: [UserService],
})
export class UserModule {}
