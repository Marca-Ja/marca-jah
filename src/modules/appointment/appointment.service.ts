import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getDay, isWithinInterval } from 'date-fns';
import { PrismaService } from '../../infra/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: data.doctorId,
      },
    });
    if (!doctor) {
      throw new NotFoundException('Médico não encontrado');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const appointmentDate = data.scheduledAt;
    const dayOfWeek = getDay(appointmentDate);
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new BadRequestException(
        'Agendamentos são permitidos apenas em dias úteis.',
      );
    }

    const startBusinessHours = new Date(appointmentDate);
    startBusinessHours.setHours(9, 0, 0, 0);

    const endBusinessHours = new Date(appointmentDate);
    endBusinessHours.setHours(18, 0, 0, 0);

    if (
      !isWithinInterval(appointmentDate, {
        start: startBusinessHours,
        end: endBusinessHours,
      })
    ) {
      throw new BadRequestException(
        'Agendamentos devem ser realizados dentro do horário comercial (9h às 18h).',
      );
    }

    return this.prisma.appointment.create({ data });
  }

  findAll() {
    return this.prisma.appointment.findMany();
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada');
    }
    await this.prisma.appointment.delete({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Consulta removida com sucesso' };
  }
}
