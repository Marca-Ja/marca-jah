import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers;

    try {
      const data = this.authService.verifyToken(
        (authorization.authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      request.user = await this.userService.listUser(data.sub);

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
