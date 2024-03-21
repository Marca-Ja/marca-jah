import { MaritalState } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
  IsDate,
  MinDate,
  MaxDate,
  Matches,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../../enum/role.enum';

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  // @MinLength(3)
  socialName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  //   dependents: string[];

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'A data de nascimento deve ser uma data válida' })
  // @MinDate(getMinBirthDate(), {
  //   message: 'Você deve ter pelo menos 18 anos para se cadastrar',
  // })
  // @MaxDate(new Date(), {
  //   message: 'A data de nascimento não pode ser no futuro',
  // })
  bornedAt: Date;

  @IsNotEmpty()
  @Matches(/^\d{9}$/, { message: 'Número de telefone inválido' })
  cellphone: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsOptional()
  @Matches(/^\d{8}$/, {
    message: 'CEP inválido. O CEP deve conter 8 dígitos numéricos.',
  })
  postalCode: string;

  city: string;

  state: string;

  street: string;

  maritalState: MaritalState;

  receiveNews: boolean;

  @IsOptional()
  @IsEnum(Role)
  role: string;
  // medical_interest: string[];
}

function getMinBirthDate(): Date {
  const today = new Date();
  return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
}
