import { PartialType } from '@nestjs/mapped-types';
import { CreateRviaacDto } from './create-rviaac.dto';

export class UpdateRviaacDto extends PartialType(CreateRviaacDto) {}
