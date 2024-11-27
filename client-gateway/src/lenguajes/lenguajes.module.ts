import { Module } from '@nestjs/common';
import { LenguajesController } from './lenguajes.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [LenguajesController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class LenguajesModule {}
