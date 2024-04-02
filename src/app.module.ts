import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import {
  ThrottlerGuard,
  ThrottlerModule,
  ThrottlerOptions,
} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ] as ThrottlerOptions[]),
    DoctorModule,
    AuthModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
