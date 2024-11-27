import { Module } from '@nestjs/common';
import { RviacpController } from './rviacp.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RviacpController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class RviacpModule {}
