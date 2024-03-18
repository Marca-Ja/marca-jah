import { IsDateString, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @MinLength(3)
  fistName: string;

  @IsEmail()
  email: string;

  @IsString()
  lastName: string;

  @IsString()
  university: string;

  @IsDateString()
  bornedAt: string;

  @IsString()
  servicePreference: string;

  @IsDateString()
  updatedAt: string;
}
