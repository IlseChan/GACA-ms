import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { USUARIOS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(USUARIOS_SERVICE) private readonly usuariosClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    // return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    // return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    // return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.usuariosService.remove(+id);
  }
}
