import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { GoogleStrategy } from '../../infra/google.strategy';
import { PrismaModule } from '../../infra/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorController],
  providers: [DoctorService, GoogleStrategy],
})
export class DoctorModule {}
