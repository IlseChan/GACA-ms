import { Module } from '@nestjs/common';
import { RviacoController } from './rviaco.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RviacoController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class RviacoModule {}
