import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles), // Asigna los roles a los metadatos
    UseGuards(AuthGuard), // Aplica el guard de autenticación
  );
}
