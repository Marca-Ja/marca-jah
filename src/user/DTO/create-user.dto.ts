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
  socialName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  //   dependents: string[];

  @IsOptional()
  bornedAt: string;

  @IsOptional()
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
  postalCode: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  street: string;

  @IsOptional()
  maritalState: MaritalState;

  //   medical_interest: string[];

  @IsOptional()
  receiveNews: boolean;
}
