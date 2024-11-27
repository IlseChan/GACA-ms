import { Controller, Body, Patch, Param, Inject, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UpdateRviaprodocDto } from './dto/update-rviaprodoc.dto';
import { NATS_SERVICE, RVIAPRODOC_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('rviaprodoc')
export class RviaprodocController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Patch(':id')
  patchAppRateProject(@Param('id', ParseIntPipe) id: number, @Body() updateRviaprodocDto: UpdateRviaprodocDto) {
    const { idu_proyecto, opc_estatus_doc, opc_estatus_doc_code } = updateRviaprodocDto;

    if (!idu_proyecto || opc_estatus_doc || opc_estatus_doc_code ) {
      throw new BadRequestException(
        'Todos los campos (idu_proyecto, opc_estatus_doc, opc_estatus_doc_code ) son obligatorios.',
      );
    }

    return this.client.send(
      'rviaprodoc.update',
      {
        idu_proyecto,
        ...updateRviaprodocDto,
      },
    )
    .pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }  
}
