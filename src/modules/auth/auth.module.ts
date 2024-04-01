import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../infra/prisma.module';
import { DoctorModule } from '../doctor/doctor.module';
import { DoctorService } from '../doctor/doctor.service';
import { PrismaService } from '../../infra/prisma.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    forwardRef(() => DoctorModule),
    forwardRef(() => UserModule),
    forwardRef(() => AppointmentModule),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DoctorService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
