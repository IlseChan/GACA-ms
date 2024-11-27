import { Body, Controller, Delete, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { NATS_SERVICE, USUARIOS_SERVICE } from 'src/config';

@Controller('usuarios')
export class UsuariosController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('/roles') 
  async findAllRoles() {
    return this.client.send('get_all_roles', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  async updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.client
      .send('update_users_application', { id, updateDto: updateUsuarioDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  async findAllUsuarios() {
    return this.client.send('get_all_users_applications', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id') 
  async findOneUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('get_users_application', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
