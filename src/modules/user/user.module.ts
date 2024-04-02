import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from '../doctor/doctor.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, DoctorService],
  exports: [UserService],
})
export class UserModule {}
