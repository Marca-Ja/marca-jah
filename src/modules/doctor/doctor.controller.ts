import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum/role.enum';
import { responses } from '../../global/docs/schema.docs';
import { RoleGuard } from '../../guards/role.guard';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
  @Roles(Role.Doctor)
  @UseGuards(AuthGuard, RoleGuard)
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
  @Roles(Role.Doctor)
  @UseGuards(AuthGuard, RoleGuard)
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
