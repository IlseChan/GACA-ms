import { IsInt, IsString, IsNotEmpty, IsEmail, Min, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsInt()
  @Min(1, { message: 'El idu_aplicacion debe ser un número positivo.' })
  idu_aplicacion: number;

  @IsInt()
  @Min(1, { message: 'El idu_usuario debe ser un número positivo.' })
  idu_usuario: number;

  @IsString()
  @IsNotEmpty({ message: 'El campo user_name no puede estar vacío.' })
  @MaxLength(50, { message: 'El nombre de usuario no puede superar los 50 caracteres.' })
  user_name: string;

  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  email: string; 

  @IsString()
  @IsNotEmpty({ message: 'El rol del usuario es obligatorio.' })
  role: string; 
}
