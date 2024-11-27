import { PartialType } from '@nestjs/mapped-types';
import { CreateRviacpDto } from './create-rviacp.dto';

export class UpdateRviacpDto extends PartialType(CreateRviacpDto) {}
