import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const existEmail = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (existEmail) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    return this.prisma.user.create({ data });
  }

  async list() {
    return this.prisma.user.findMany();
  }
}
