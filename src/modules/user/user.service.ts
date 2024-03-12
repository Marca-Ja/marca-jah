import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdatePatchUserDTO } from './DTO/update-patch-user.dto';
import { UpdatePutUserDTO } from './DTO/update-put-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDTO) {
    await this.validateUser(data);

    const hash = await bcrypt.hash(data.password, 8)

    data.password = hash

    return this.prisma.user.create({data});
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async update(id: string, data: UpdatePutUserDTO){
    await this.exists(id);

    const hash = await bcrypt.hash(data.password, 8)
    
    data.password = hash

    return this.prisma.user.update({
      where: {id},
      data
    })
  }

  async updatePartial(id: string, {name, socialName, lastName, bornedAt, cellphone, email, password, postalCode, city, state, street, maritalState, receiveNews}: UpdatePatchUserDTO){
    await this.exists(id);

    const data: any = {};

  for (const [key, value] of Object.entries({ name, socialName, lastName, bornedAt, cellphone, email, password, postalCode, city, state, street, maritalState, receiveNews })) {
    if (value) {
      if (key === 'password' && typeof value === 'string') {
        const hash = await bcrypt.hash(value, 8);
        data[key] = hash;
      } 

      data[key] = value;
    }
  }

    return this.prisma.user.update({
      where: {id},
      data
    })
  }

  async validateUser(data: any) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (user) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    return true;
  }

  async exists(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
