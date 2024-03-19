import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    await this.validateUser(id);

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return this.prisma.user.update({
      where: { id },
      data,
    });
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
    await this.validateUser(id);

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

    return this.prisma.user.update({
      where: { id },
      data,
    });
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

    if (isEmail(data.email) && data.email.length > 0) {
      const userEmail = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (userEmail) {
        throw new UnauthorizedException('Email já cadastrado');
      }
    }

    const userId = await this.prisma.user.findFirst({
      where: { id: data.id },
    });

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    return true;
  }
}
