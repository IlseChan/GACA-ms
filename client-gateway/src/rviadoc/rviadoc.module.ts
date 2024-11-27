import { Module } from '@nestjs/common';
import { RviadocController } from './rviadoc.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RviadocController],
  imports:[
    NatsModule
  ]
})
export class RviadocModule {}
