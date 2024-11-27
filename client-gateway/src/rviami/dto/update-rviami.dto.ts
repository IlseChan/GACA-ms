import { PartialType } from '@nestjs/mapped-types';
import { CreateRviamiDto } from './create-rviami.dto';

export class UpdateRviamiDto extends PartialType(CreateRviamiDto) {}
