import { MaritalState } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

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

  @IsString()
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
