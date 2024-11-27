import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsInt()
  idu_aplicacion?: number;

  @IsOptional()
  @IsInt()
  idu_usuario?: number;

  @IsOptional()
  @IsString()
  user_name?: string;
}
