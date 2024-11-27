import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RviaacController } from './rviaac.controller';
import { NatsModule } from 'src/transports/nats.module';

// console.log(`Conectando a RVIAAC_SERVICE en ${envs.RVIAAC_MicroserviceHost}:${envs.RVIAAC_MicroservicePort}`);

@Module({
  controllers: [RviaacController],
  imports: [
    NatsModule
  ],
})
export class RviaacModule {}
