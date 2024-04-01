import { ApiProperty } from '@nestjs/swagger';
import { MaritalState } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
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
  IsOlderThan18,
  IsWithinLast130Years,
} from 'src/decorators/validation.decorator';
import { Role } from '../../../enum/role.enum';

export class CreateUserDTO {
  @ApiProperty({ example: 'Jhon' })
  @IsString({ message: "A propriedade 'name' deve ser uma String" })
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "A propriedade 'socialName' deve ser uma String" })
  socialName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString({ message: "A propriedade 'lastName' deve ser uma String" })
  @MinLength(3)
  lastName: string;

  @ApiProperty({
    example: '1980/09/12',
    description: 'A data deve ser no formato AAAA/MM/DD',
  })
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

  @ApiProperty({
    example: 'jhonDoe@email.com',
    description: "O campo 'email' é único no banco de dados",
  })
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
  @IsOptional()
  @IsString({ message: "A propriedade 'city' deve ser uma String" })
  city: string;

  @ApiProperty({ example: 'AP' })
  @IsOptional()
  @IsString({ message: "A propriedade 'state' deve ser uma String" })
  state: string;

  @ApiProperty({ example: 'Rua Barão de Mauá' })
  @IsOptional()
  @IsString({ message: "A propriedade 'street' deve ser uma String" })
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
  @IsOptional()
  @IsEnum(MaritalState, {
    message:
      'Estado civil inválido. Escolha entre: SINGLE, MARRIED, DIVORCED, WINDOWED, SEPARATED, IN_CIVIL_UNION',
  })
  maritalState: MaritalState;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean({ message: "A propriedade 'receiveNews' deve ser um Boolean" })
  receiveNews: boolean;

  @ApiProperty({ enum: ['User', 'Doctor'] })
  @IsOptional()
  @IsEnum(Role)
  role: string;
}
