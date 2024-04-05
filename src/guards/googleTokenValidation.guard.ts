import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class GoogleTokenValidation implements NestMiddleware {
  constructor(private httpService: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não informado');
    }

    try {
      const googleResponse = await this.httpService
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
        )
        .toPromise();

      if (googleResponse.data) {
        const decodeToken = verify(token, process.env.JWT_SECRET);
        req.user = decodeToken;
        next();
      } else {
        throw new UnauthorizedException('Token Inválido');
      }
    } catch (error) {
      throw new UnauthorizedException('Erro ao validar Token');
    }
  }
}
