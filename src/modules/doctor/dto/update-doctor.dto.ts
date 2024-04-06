import { ServicePreference } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  IsOlderThan18,
  IsWithinLast130Years,
} from 'src/decorators/validation.decorator';
import { Role } from '../../../enum/role.enum';

export class UpdateDoctorDto {
  @ApiProperty({ example: 'Jhon' })
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'UFRJ' })
  @IsString()
  @IsNotEmpty()
  university: string;

  @ApiProperty({ example: '1980/09/12' })
  @Type(() => Date)
  @IsDate()
  @IsOlderThan18({
    message: 'Você deve ter pelo menos 18 anos para se cadastrar',
  })
  @IsWithinLast130Years({ message: 'Data de nascimento inválida' })
  @IsNotEmpty()
  bornedAt: string;

  @ApiProperty({ example: '1' })
  @IsNumberString(
    {},
    {
      message:
        "O campo 'specialtyId' é inválido. Utilize apenas números dentro da string",
    },
  )
  specialtyId: string;

  @ApiProperty({ example: 'ONLINE' })
  @IsNotEmpty()
  servicePreference: ServicePreference;

  @ApiProperty({ example: 'Doctor' })
  @IsOptional()
  @IsEnum(Role)
  role: string;
}
