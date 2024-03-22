import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import { error } from 'console';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum/role.enum';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Roles(Role.Doctor)
@ApiBearerAuth('access')
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // @Post()
  // create(@Body() createDoctorDto: CreateDoctorDto) {
  //   return this.doctorService.create(createDoctorDto);
  // }

  @Get()
  findAll() {
    try {
      return this.doctorService.findAll();
    } catch (e) {
      throw new error(e.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorService.update(+id, updateDoctorDto);
  // }

  @Put(':id')
  update(@Body() data: UpdateDoctorDto, @Param('id') id: string) {
    return this.doctorService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
