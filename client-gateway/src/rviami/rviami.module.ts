import { Module } from '@nestjs/common';
import { RviamiController } from './rviami.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RviamiController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class RviamiModule {}
