import { MaritalState } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

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

  bornedAt: string;

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

  postalCode: string;

  city: string;

  state: string;

  street: string;

  maritalState: MaritalState;

  receiveNews: boolean;

  // medical_interest: string[];
}
