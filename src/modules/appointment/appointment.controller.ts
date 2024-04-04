import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { responses } from '../../global/docs/schema.docs';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '../../enum/role.enum';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Cadastro de uma consulta',
    description:
      'Essa rota cria uma consulta para um usuário. Elas são criadas com o status "PENDENTE".',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Post()
  create(@Body() data: CreateAppointmentDto) {
    return this.appointmentService.create(data);
  }

  @Roles(Role.Doctor, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna todos os pedidos de consultas de um médico',
    description: 'Essa rota lista todas as consultas feitas por usuários.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Remoção de consultas de um usuário',
    description: 'Essa rota deleta uma consulta específica.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Delete(':appointmentId')
  remove(@Param('appointmentId') id: string) {
    return this.appointmentService.remove(id);
  }
}
