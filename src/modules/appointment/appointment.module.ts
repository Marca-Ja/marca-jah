import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from '../../infra/prisma.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { DoctorService } from '../doctor/doctor.service';
import { TwilioModule } from 'src/infra/twilio/twilio.module';
import { TwilioService } from 'src/infra/twilio/twilio.service';

@Module({
  imports: [PrismaModule, TwilioModule],
  controllers: [AppointmentController, UserController],
  providers: [
    AppointmentService,
    AuthService,
    JwtService,
    UserService,
    DoctorService,
    TwilioService
  ],
})
export class AppointmentModule {}
