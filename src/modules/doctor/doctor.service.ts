import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async findDoctor(email: string) {
    return this.prisma.doctor.findFirst({ where: { email } });
  }

  async findAll() {
    return this.prisma.doctor.findMany();
  }

  async findOne(id: string) {
    return this.prisma.doctor.findFirst({
      where: { id },
    });
  }

  async update(id: string, data: UpdateDoctorDto) {
    await this.exists(id);

    if (data.hasOwnProperty('email')) {
      throw new BadRequestException('Email não pode ser alterado');
    }

    return this.prisma.doctor.update({
      data,
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.doctor.delete({ where: { id } });
  }

  async exists(id: string) {
    if (!(await this.prisma.doctor.count({ where: { id } }))) {
      throw new NotFoundException('Médico não encontrado');
    }
  }
}
