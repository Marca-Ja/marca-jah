import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const { email, firstName, lastName, accessToken, refreshToken } = req.user;

    let session = await this.prisma.sessionToDoctor.findFirst({
      where: { email },
    });

    try {
      if (!session) {
        session = await this.prisma.sessionToDoctor.create({
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
}
