import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateDoctorAppointmentDto } from './dto/update-doctor-appointment.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.doctor.findMany();
  }

  async findDoctor(id: string) {
    return this.prisma.doctor.findUnique({
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
  async findAllAppointmentsbyDoctor(appointmentId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: appointmentId },
    });
    if (!doctor) {
      throw new NotFoundException('Médico não encontrado');
    }
    const data = await this.prisma.appointment.findMany({
      where: {
        doctorId: appointmentId,
      },
    });

    return data;
  }
  async updateAppointment (appointmentId: string, status:UpdateDoctorAppointmentDto){
    if (!status) {
      throw new Error("Status DTO is undefined or not provided");
    }

    const appointment = await this.prisma.appointment.findFirst({
      where: {id: appointmentId}
    })
    if(!appointment){
      throw new NotFoundException('Consulta não encontrada')
    }


    const updatedAppointment = await this.prisma.appointment.update({
      data: {status: status.status},
      where: { id: appointmentId },
    });
    return { message: 'Status da consulta atualizado com sucesso.', updatedAppointment  }

  }
}
