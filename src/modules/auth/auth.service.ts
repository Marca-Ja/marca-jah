import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../infra/prisma.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const { email, firstName, lastName, accessToken, refreshToken } = req.user;

    let session = await this.prismaService.sessionToDoctor.findFirst({
      where: { email },
    });

    try {
      if (!session) {
        session = await this.prismaService.sessionToDoctor.create({
          data: {
            email,
            firstName,
            lastName,
            accessToken,
            refreshToken,
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          name: user.name,
          email: user.email,
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
}
