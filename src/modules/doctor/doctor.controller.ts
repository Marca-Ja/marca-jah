import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { error } from 'console';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum/role.enum';
import { responses } from '../../global/docs/schema.docs';
import { RoleGuard } from '../../guards/role.guard';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('Doctor')
@Roles(Role.Doctor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({
    summary: 'Retorna todos os médicos',
    description: 'Essa rota lista todos os médicos cadastrados',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get()
  findAll() {
    try {
      return this.doctorService.findAll();
    } catch (e) {
      throw new error(e.message);
    }
  }

  @ApiOperation({
    summary: 'Retorna médico específico',
    description:
      'Essa rota retorna um médico específico com base no seu ID (identificação única)',
  })
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

  @ApiOperation({
    summary: 'Atualização do cadastro',
    description: 'Essa rota atualiza os dados do médico cadastrado autenticado',
  })
  @ApiBearerAuth('access')
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

  @ApiOperation({
    summary: 'Remoção de um médico',
    description: 'Essa rota deleta um médico específico do banco de dados',
  })
  @ApiBearerAuth('access')
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
}
