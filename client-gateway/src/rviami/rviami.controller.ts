import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateRviamiDto } from './dto/create-rviami.dto';
import { UpdateRviamiDto } from './dto/update-rviami.dto';
import { NATS_SERVICE, RVIAMI_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('rviami')
export class RviamiController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createRviamiDto: CreateRviamiDto) {

    return this.client.send(
      'rvia.migracion.proyecto',
      createRviamiDto,
    );
  }

}
