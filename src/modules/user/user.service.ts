import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { isEmail, isUUID } from 'class-validator';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdatePatchUserDTO } from './DTO/update-patch-user.dto';
import { UpdatePutUserDTO } from './DTO/update-put-user.dto';
import { getDay, isWithinInterval } from 'date-fns';
import { CreateAppointmentDto } from './DTO/create-appointment.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    await this.validateUser(data);

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return this.prisma.user.create({ data });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async listUser(id: string) {
    await this.validateUser(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdatePutUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    try {
      await this.validateUser(id);

      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      return user;
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async updatePartial(
    id: string,
    {
      name,
      socialName,
      lastName,
      bornedAt,
      cellphone,
      email,
      password,
      postalCode,
      city,
      state,
      street,
      maritalState,
      receiveNews,
      role,
    }: UpdatePatchUserDTO,
  ) {
    const data: any = {};

    for (const [key, value] of Object.entries({
      name,
      socialName,
      lastName,
      bornedAt,
      cellphone,
      email,
      password,
      postalCode,
      city,
      state,
      street,
      maritalState,
      receiveNews,
      role,
    })) {
      if (value) {
        if (key === 'password' && typeof value === 'string') {
          const hash = await bcrypt.hash(value, 8);
          data[key] = hash;
        }

        data[key] = value;
      }
    }

    try {
      await this.validateUser(id);

      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Algo deu errado :(');
    }
  }

  async findAll(page: number, limit: number) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      return this.prisma.doctor.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          servicePreference: true,
          university: true,
          specialtyId: true,
        },
        take: limit,
        skip,
      });
    }

    return this.prisma.doctor.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        servicePreference: true,
        university: true,
        specialtyId: true,
      },
    });
  }

  async findPreference(specialtyID: string, page: number, limit: number) {
    if (specialtyID) {
      if (page && limit) {
        const skip = (page - 1) * limit;
        return this.prisma.doctor.findMany({
          where: { specialtyId: specialtyID },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            servicePreference: true,
            university: true,
            specialtyId: true,
          },
          take: limit,
          skip,
        });
      }
      return this.prisma.doctor.findMany({
        where: { specialtyId: specialtyID },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          servicePreference: true,
          university: true,
          specialtyId: true,
        },
      });
    }
  }

  async validateUser(data: any) {
    if (isUUID(data)) {
      const userId = await this.prisma.user.findFirst({
        where: { id: data.id },
      });

      if (!userId) {
        throw new NotFoundException('User not found');
      }
    }

    if (isEmail(data.email)) {
      const userEmail = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (userEmail) {
        throw new UnauthorizedException('Email já cadastrado');
      }
    }

    return true;
  }
  async findAllAppointmentsbyUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const data = await this.prisma.appointment.findMany({
      where: {
        userId,
      },
    });

    return data;
  }
  async createAppointment(data: CreateAppointmentDto) {
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
  async removeAppointment(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada');
    }
    await this.prisma.appointment.delete({ where: { id } });

    return { message: 'Consulta removida com sucesso' };
  }
}
