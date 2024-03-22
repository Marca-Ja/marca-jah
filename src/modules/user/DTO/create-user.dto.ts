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

  @Type(() => Date)
  @IsDate()
  @IsOlderThan18({
    message: 'Você deve ter pelo menos 18 anos para se cadastrar',
  })
  @IsWithinLast130Years({ message: 'Data de nascimento inválida' })
  bornedAt: string;

  @Matches(
    /^(\+?\d{1,3})?[-.\s]?\(?(\d{1,3})\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    { message: 'Número de telefone inválido' },
  )
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
