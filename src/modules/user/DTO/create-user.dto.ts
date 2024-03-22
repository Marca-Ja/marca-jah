import { MaritalState } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';
import {
  IsWithinLast130Years,
  IsOlderThan18,
} from 'src/decorators/validation.decorator';
import { Role } from '../../../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  socialName: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOlderThan18({
    message: 'Você deve ter pelo menos 18 anos para se cadastrar',
  })
  @IsWithinLast130Years({ message: 'Data de nascimento inválida' })
  bornedAt: string;

  @ApiProperty()
  @Matches(
    /^(\+?\d{1,3})?[-.\s]?\(?(\d{1,3})\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    { message: 'Número de telefone inválido' },
  )
  cellphone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^\d{8}$/, {
    message: 'CEP inválido. O CEP deve conter 8 dígitos numéricos.',
  })
  @ApiProperty()
  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  maritalState: MaritalState;

  @ApiProperty()
  receiveNews: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: string;
}
