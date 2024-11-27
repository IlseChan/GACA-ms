import { Controller, Post, Body, Inject, BadRequestException } from '@nestjs/common';
import { NATS_SERVICE, RVIASA_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRviasaDto } from './dto/create-rviasa.dto';
import { lastValueFrom } from 'rxjs';

@Controller('rviasa')
export class RviasaController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createRviasaDto: CreateRviasaDto) {
    const { idu_proyecto, num_accion, numero_empleado, path_project } = createRviasaDto;

    if (!idu_proyecto || !num_accion || !numero_empleado || !path_project) {
      throw new BadRequestException(
        'Todos los campos (idu_proyecto, num_accion, numero_empleado, path_project) son obligatorios.',
      );
    }

    const message = {
      idu_proyecto,
      num_accion,
      numero_empleado,
      path_project,
    };

    const result = this.client.send('createSanitizacion', message);
    return await lastValueFrom(result);
  }
}
