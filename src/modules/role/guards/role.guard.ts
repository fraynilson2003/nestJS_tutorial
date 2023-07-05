import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from "@nestjs/core"
import { IJwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';
import { RoleType } from '../roletype.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {

  }


  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get<string[]>("roles", context.getHandler())

    if (!roles.length) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user as IJwtPayload

    const hasRole: boolean = roles.every((role: RoleType) => user.roles.includes(role))

    return user && user.roles && hasRole;
  }
}
