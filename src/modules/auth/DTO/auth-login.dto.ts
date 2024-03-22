import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({ example: 'jhonDoe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Marca@Ja123#' })
  @IsString()
  @MinLength(6)
  password: string;
}
