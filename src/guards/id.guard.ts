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
          'Parâmetro identificador (Id) do usuário não encontrado na solicitação.',
        );
      }

      if (data.sub !== userId) {
        throw new UnauthorizedException(
          'Acesso Negado: O usuário só pode acessar seu próprio perfil.',
        );
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Acesso não autorizado.',
      );
    }
  }
}
