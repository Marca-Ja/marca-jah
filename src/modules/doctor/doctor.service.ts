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

  async findAll(page: string, limit: string) {
    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      return await this.prisma.doctor.findMany({
        take: parseInt(limit),
        skip,
      });
    }

    return this.prisma.doctor.findMany();
  }

  async findDoctor(id: string) {
    await this.exists(id);

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
    await this.exists(id);
    await this.prisma.doctor.delete({ where: { id } });
    return 'Médico removido com sucesso';
  }

  async exists(id: string) {
    if (!(await this.prisma.doctor.findUnique({ where: { id } }))) {
      throw new NotFoundException('Médico não encontrado');
    }
  }

  async findAllAppointmentsbyDoctor(
    doctorId: string,
    page: string,
    limit: string,
  ) {
    await this.exists(doctorId);

    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      return await this.prisma.appointment.findMany({
        where: {
          doctorId,
        },
        take: parseInt(limit),
        skip,
      });
    }

    const data = await this.prisma.appointment.findMany({
      where: {
        doctorId,
      },
    });

    return data;
  }
  async updateAppointment(
    appointmentId: string,
    status: UpdateDoctorAppointmentDto,
  ) {
    if (!status) {
      throw new Error('O status do DTO é indefinido ou não foi fornecido');
    }

    const appointment = await this.prisma.appointment.findFirst({
      where: { id: appointmentId },
    });
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada');
    }

    const updatedAppointment = await this.prisma.appointment.update({
      data: { status: status.status },
      where: { id: appointmentId },
    });
    return {
      message: 'Status da consulta atualizado com sucesso.',
      updatedAppointment,
    };
  }
}
