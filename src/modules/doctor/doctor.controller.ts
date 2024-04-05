import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { error } from 'console';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum/role.enum';
import { responses } from '../../global/docs/schema.docs';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { DoctorService } from './doctor.service';
import { UpdateDoctorAppointmentDto } from './dto/update-doctor-appointment.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IdGuard } from 'src/guards/id.guard';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna todos os médicos',
    description:
      'Essa rota lista todos os médicos cadastrados no banco de dados.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    try {
      return this.doctorService.findAll(page, limit);
    } catch (e) {
      throw new error(e.message);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Retorna médico específico',
    description:
    'Essa rota retorna um médico específico com base no seu ID (identificação única).',
  })

  @ApiBearerAuth('access')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findDoctor(id);
  }

  @Roles(Role.Doctor, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard, IdGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Atualização do cadastro',
    description:
      'Essa rota atualiza os dados do médico cadastrado autenticado.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Put(':id')
  update(@Body() data: UpdateDoctorDto, @Param('id') id: string) {
    return this.doctorService.update(id, data);
  }

  @Roles(Role.Doctor, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard, IdGuard)
  @Roles(Role.Doctor)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Remoção de um médico',
    description: 'Essa rota deleta um médico específico do banco de dados.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }

  @Roles(Role.Doctor)
  @UseGuards(AuthGuard, RoleGuard, IdGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna todas as consultas do médico',
    description:
      'Essa rota retorna todas as consultas do médico sua ID (identificação única).',
  })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get('appointment/:doctorId')
  findAllByDoctor(@Param('doctorId') doctorId: string, @Query('page') page: string, @Query('limit') limit: string) {
    return this.doctorService.findAllAppointmentsbyDoctor(doctorId, page, limit);
  }

  @Roles(Role.Doctor, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Confirmação de consulta',
    description:
      'Essa rota permite ao médico aceitar ou recusar as consultas designadas a ele.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Put('appointment/:appointmentId')
  updateAppointment(
    @Body() status: UpdateDoctorAppointmentDto,
    @Param('appointmentId') appointmentId: string,
  ) {
    return this.doctorService.updateAppointment(appointmentId, status);
  }

}
