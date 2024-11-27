import { Module } from '@nestjs/common';
import { RviacalController } from './rviacal.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RviacalController],
  imports:[
    NatsModule
  ]
})
export class RviacalModule {}
