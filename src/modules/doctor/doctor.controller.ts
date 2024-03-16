import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { error } from 'console';
import { RoleGuard } from '../../guards/role.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Role } from '../../enum/role.enum';
import { Roles } from '../../decorators/roles.decorator';

@Roles(Role.Doctor)
@UseGuards(AuthGuard, RoleGuard)
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
    return this.doctorService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorService.update(+id, updateDoctorDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
