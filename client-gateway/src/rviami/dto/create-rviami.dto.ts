import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsString } from "class-validator";

export class CreateRviamiDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idu_proyecto: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    @IsIn([ 3 ], {
        message: 'El valor de num_accion debe ser 3',
    })
    num_accion: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    numero_empleado: number;

    @IsString()
    path_project: string
}
