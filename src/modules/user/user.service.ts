import {
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
}
