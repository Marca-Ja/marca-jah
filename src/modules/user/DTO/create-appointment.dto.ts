import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsUUID } from 'class-validator';
import { Status, PaymentMethod } from '@prisma/client';

import { Type } from 'class-transformer';
import { isFutureDate } from '../../../decorators/futureDate.decorator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '35fe789c-0c7a-4dbf-ba25-387ef199a994' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: '35fe789c-0c7a-4dbf-ba25-387ef199a994' })
  @IsUUID()
  doctorId: string;

  @ApiProperty({ enum: [Status.PENDING, Status.CANCELED, Status.APROVED] })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    enum: [
      PaymentMethod.CASH,
      PaymentMethod.CREDIT_CARD,
      PaymentMethod.DEBIT_CARD,
      PaymentMethod.PIX,
    ],
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: '2024-06-10T00:50:55.000Z' })
  @IsDate()
  @isFutureDate({ message: 'A data de agendamento deve ser uma data futura' })
  @Type(() => Date)
  scheduledAt: Date;
}
