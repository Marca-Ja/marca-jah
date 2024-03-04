import { MaritalState } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  name: string;
  //   social_name: string;
  //   last_name: string;

  //   dependents: string[];
  //   @IsDate()
  //   @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
  @IsOptional()
  bornedAt: string;

  @IsOptional()
  celphone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
  //   postal_code: string;
  @IsOptional()
  city: string;

  @IsOptional()
  state: string;
  //   street: string;
  @IsOptional()
  maritalState: MaritalState;
  //   medical_interest: string[];
  @IsOptional()
  receive_newsLetter: boolean;
}
