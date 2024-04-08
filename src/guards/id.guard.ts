import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';
import { DoctorService } from '../modules/doctor/doctor.service';

@Injectable()
export class IdGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const authorization = request.headers;

    try {
      const data = this.authService.verifyToken(
        (authorization.authorization ?? '').split(' ')[1],
      );

      const userId = params.userId || params.id || params.doctorId;
      if (!userId) {
        throw new UnauthorizedException(
          'User identifier parameter not found in the request.',
        );
      }

      if (data.sub !== userId) {
        throw new UnauthorizedException(
          'Access denied: User can only access their own profile.',
        );
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Unauthorized access.');
    }
  }
}
