import { Module } from '@nestjs/common';
import { RviaprodocController } from './rviaprodoc.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RviaprodocController],
  imports:[
    NatsModule
  ]
})
export class RviaprodocModule {}
