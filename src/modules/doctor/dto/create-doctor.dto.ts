import { ServicePreference } from '@prisma/client';

import {
  IsDateString,
  IsEmail,
  IsString,
  MinLength,
  isEnum,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @MinLength(3)
  fistName: string;

  @IsEmail()
  email: string;

  @IsString()
  lastName: string;

  @IsString()
  university: string;

  @IsDateString()
  bornedAt: string;

  @IsDateString()
  updatedAt: string;

  servicePreference: ServicePreference;
}
