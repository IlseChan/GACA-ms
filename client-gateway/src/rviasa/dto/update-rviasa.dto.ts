import { PartialType } from '@nestjs/mapped-types';
import { CreateRviasaDto } from './create-rviasa.dto';

export class UpdateRviasaDto extends PartialType(CreateRviasaDto) {}
