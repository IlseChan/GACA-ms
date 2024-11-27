import { Controller, Get, Body, Patch, Param, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE, RVIACP_SERVICE } from '../config/services';
import { CreateRviacpDto } from './dto';

@Controller('rviacp')
export class RviacpController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy  
  ) {}

  @Patch(':id')
  addApptestCases(@Param('id') id: string, @Body() createTestCases: CreateRviacpDto) {
    return this.client.send(
        'testCases.addAppTestCases',
        {
          idu_proyecto: id,
          ...createTestCases
        }
      ).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAll() {
    return this.client.send(
      'testCases.findAll',
      {}
    ).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
