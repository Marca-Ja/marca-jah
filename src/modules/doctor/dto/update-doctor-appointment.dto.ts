import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateDoctorAppointmentDto {
    @ApiProperty({ enum: ['APROVED', 'CANCELED', 'PENDING'] })
    @IsEnum(Status, { message: 'Status inválido. Os valores permitidos são: APROVED, CANCELED, PENDING.' })
    status: Status
}
