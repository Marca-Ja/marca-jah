import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { GoogleStrategy } from '../../infra/google.strategy';
import { PrismaModule } from '../../infra/prisma.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorController],
  providers: [
    DoctorService,
    GoogleStrategy,
    AuthService,
    JwtService,
    UserService,
  ],
})
export class DoctorModule {}
