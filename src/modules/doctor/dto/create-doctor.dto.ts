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
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  university: string;

  @ApiProperty()
  @IsDateString()
  bornedAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty()
  servicePreference: ServicePreference;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  enum: string;
}
