import { Controller, Body, Patch, Param, Inject, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UpdateRviacalDto } from './dto/update-rviacal.dto';
import { NATS_SERVICE, RVIACAL_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('rviacal')
export class RviacalController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}
  
  @Patch(':id')
  patchAppRateProject(@Param('id', ParseIntPipe) id: number, @Body() updateRviacalDto: UpdateRviacalDto) {
    const { idu_aplicacion, opc_arquitectura, opc_estatus_calificar } = updateRviacalDto;

    if (!idu_aplicacion || opc_arquitectura || opc_estatus_calificar ) {
      throw new BadRequestException(
        'Todos los campos (idu_aplicacion, opc_arquitectura, opc_estatus_calificar ) son obligatorios.',
      );
    }

    return this.client.send(
      'rviacal.update',
      {
        idu_aplicacion,
        ...updateRviacalDto,
      },
    )
    .pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }  
}
