import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma.service';
// import { CreateDoctorDto } from './dto/create-doctor.dto';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  createUser(arg0: { email: any; firstName: any; lastName: any; accessToken: any; refreshToken: any; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) { }
  // create(createDoctorDto: CreateDoctorDto) {
  //   return 'This action adds a new doctor';
  // }

  findAll() {
    return this.prisma.sessionToDoctor.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  // update(id: number, updateDoctorDto: UpdateDoctorDto) {
  //   return `This action updates a #${id} doctor`;
  // }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
