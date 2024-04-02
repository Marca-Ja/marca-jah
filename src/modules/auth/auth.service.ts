import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../infra/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience: 'doctor' | 'user' = 'user';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async googleLogin(req: any) {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findDoctorByEmail(req.user.email);
    if (!userExists) {
      return this.registerDoctor(req.user);
    }
    const accessToken = this.createToken(userExists);

    return { accessToken };
  }

  createToken(user) {
    return {
      accessToken: this.jwtService.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '7 days',
          subject: user.id,
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }
  verifyToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
        secret: process.env.JWT_SECRET,
      });

      return data;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email,
        },
      });
      if (user) {
        return this.createToken(user);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('E-mail ou senha inválido(s)');
      }

      throw new UnauthorizedException('E-mail ou senha inválido(s)');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async registerDoctor(req) {
    if (!req) {
      return 'No user from google';
    }
    const { email, firstName, lastName } = req;
    try {
      const doctor = await this.prismaService.doctor.create({
        data: {
          email,
          firstName,
          lastName,
        },
      });

      return this.createToken(doctor);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findDoctorByEmail(email) {
    const doctor = this.prismaService.doctor.findFirst({
      where: { email },
    });

    if (!doctor) {
      return null;
    }

    return doctor;
  }
}
