import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): any => {
  return SetMetadata(ROLES_KEY, roles);
};
