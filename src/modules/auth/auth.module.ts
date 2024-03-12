import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../infra/prisma.module';
import { DoctorModule } from '../doctor/doctor.module';
import { DoctorService } from '../doctor/doctor.service';

@Module({
  imports: [PassportModule, PrismaModule, DoctorModule],
  controllers: [AuthController],
  providers: [AuthService, DoctorService],
})
export class AuthModule {}
