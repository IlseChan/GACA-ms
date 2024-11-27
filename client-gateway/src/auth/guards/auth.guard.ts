import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE, NATS_SERVICE } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    private readonly reflector: Reflector, // Para leer los roles desde los metadatos
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {

      // Validar el token con el microservicio de autenticación
      const { user, token: newToken } = await firstValueFrom(
        this.client.send('auth.verify.user', token),
      );

      request['user'] = user;
      request['token'] = newToken;

      // Validar roles permitidos
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
      if (requiredRoles.length && !requiredRoles.includes(user.rol.nom_rol)) {
        throw new ForbiddenException(`Rol '${user.rol.nom_rol}' no autorizado`);
      }
    } catch (error) {
      throw new UnauthorizedException('Token o rol inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
