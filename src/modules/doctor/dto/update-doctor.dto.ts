import { ServicePreference } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../enum/role.enum';

export class UpdateDoctorDto {
  @ApiProperty({ example: 'Jhon' })
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'jhonDoe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'UFRJ' })
  @IsString()
  university: string;

  @ApiProperty({ example: '1980/09/12' })
  @IsDateString()
  bornedAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ examples: ['Cardiologista', 'Clínico Geral', 'Pediatra'] })
  servicePreference: ServicePreference;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: string;
}
