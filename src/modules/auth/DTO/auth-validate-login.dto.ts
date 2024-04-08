import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AuthValidateLoginDTO {
  @ApiProperty({ example: '5599999999' })
  cellphone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  code: string;
}
