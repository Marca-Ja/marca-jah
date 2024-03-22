import { ServicePreference } from '@prisma/client';

import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../enum/role.enum';

export class CreateDoctorDto {
  @IsString()
  @MinLength(3)
  firstName: string;

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

  @IsOptional()
  @IsEnum(Role)
  enum: string;
}
