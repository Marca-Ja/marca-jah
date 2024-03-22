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
  @ApiProperty({ example: 'Jhon' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  socialName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty({ example: '1980/09/12' })
  @Type(() => Date)
  @IsDate()
  @IsOlderThan18({
    message: 'Você deve ter pelo menos 18 anos para se cadastrar',
  })
  @IsWithinLast130Years({ message: 'Data de nascimento inválida' })
  bornedAt: string;

  @ApiProperty({ example: '(21)974331945' })
  @Matches(
    /^(\+?\d{1,3})?[-.\s]?\(?(\d{1,3})\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    { message: 'Número de telefone inválido' },
  )
  cellphone: string;

  @ApiProperty({ example: 'jhonDoe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Marca@Ja123#' })
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ example: '68901350' })
  @IsOptional()
  @Matches(/^\d{8}$/, {
    message: 'CEP inválido. O CEP deve conter 8 dígitos numéricos.',
  })
  postalCode: string;

  @ApiProperty({ example: 'Macapá' })
  city: string;

  @ApiProperty({ example: 'AP' })
  state: string;

  @ApiProperty({ example: 'Rua Barão de Mauá' })
  street: string;

  @ApiProperty({
    enum: [
      'SINGLE',
      'MARRIED',
      'DIVORCED',
      'WINDOWED',
      'SEPARATED',
      'IN_CIVIL_UNION',
    ],
  })
  maritalState: MaritalState;

  @ApiProperty()
  receiveNews: boolean;

  @ApiProperty({ enum: ['User', 'Doctor'] })
  @IsOptional()
  @IsEnum(Role)
  role: string;
}
