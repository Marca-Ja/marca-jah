import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../infra/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from 'src/infra/twilio/twilio.service';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience: 'doctor' | 'user' = 'user';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly twilioService: TwilioService,
  ) {}

  async googleLogin(req: any) {
    try {
      if (!req.user) {
        throw new BadRequestException('Usuário do Google não encontrado.');
      }

      if (!req.user.firstName || !req.user.lastName) {
        throw new BadRequestException(
          'Nome e/ou sobrenome do usuário do Google não encontrados.',
        );
      }

      const userExists = await this.findDoctorByEmail(req.user.email);
      if (!userExists) {
        return this.registerDoctor(req.user);
      }
      const accessToken = this.createToken(userExists);

      return accessToken;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
        this.twilioService.sendVerificationSMS(user.cellphone)
        return ('Código enviado por SMS.')
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('E-mail ou senha inválido(s)');
      }

      throw new UnauthorizedException('E-mail ou senha inválido(s)');
    } catch (error) {
      throw new BadRequestException('Usuário não cadastrado');
    }
  }

  async registerDoctor(req) {
    if (!req) {
      return 'Nenhum usuário encontrado';
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

  async validateLoginAttempt(cellphone:string, code:string) {
    try {
    const validate = await this.twilioService.checkVerificationCode(cellphone, code);
    const user = await this.prismaService.user.findFirst({
      where: {
        cellphone
      },
    })

    if (validate.status === "approved") {
      return this.createToken(user)
    }
    throw new UnauthorizedException('Token inválido');

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
