import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(arg0: {
    email: any;
    firstName: any;
    lastName: any;
    accessToken: any;
    refreshToken: any;
  }) {
    throw new Error('Method not implemented.');
  }
  // create(createDoctorDto: CreateDoctorDto) {
  //   return 'This action adds a new doctor';
  // }

  async findAll() {
    return this.prisma.doctor.findMany();
  }

  async findOne(id: string) {
    return this.prisma.doctor.findFirst({ where: { id } });
  }

  async update(id: string, data: UpdateDoctorDto) {
    await this.exists(id);

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
      throw new NotFoundException(`Doctor not found`);
    }
  }
}
