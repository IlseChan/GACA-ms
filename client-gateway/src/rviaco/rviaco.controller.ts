import { Controller, Get, Post, Body, Param, Delete, Inject, Put, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE, RVIACO_SERVICE } from '../config';
import { CreateRviacoDto, UpdateRviacoDto } from './dto';

@Controller('rviaco')
export class RviacoController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Get()
  findAll() {
    return this.client.send(
      'costo.findAll',{})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
  
  @Get(':id_proyecto')
  findOne(@Param('id_proyecto') id: string) {
    return this.client.send(
        'costo.findOne', 
        id 
      ).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post()
  create(@Body() createRviacoDto: CreateRviacoDto) {
    return this.client.send(
      'costo.create',
      createRviacoDto
    ).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRviacoDto: UpdateRviacoDto) {
    return this.client.send(
        'costo.update',
        {
          id, 
        ...updateRviacoDto 
        }
      ).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(
        'costo.remove', 
        id 
      ).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

}
