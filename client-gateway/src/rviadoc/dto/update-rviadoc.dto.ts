export class UpdateRviadocDto {
    idu_proyecto: string;
    opc_lenguaje: number;
    num_accion: number;
    opc_arquitectura: string;
    files?: Express.Multer.File[];  
    usuario?: {
      idu_usuario: number;
      numero_empleado: number;
      nom_correo: string;
      nom_usuario: string;
      esactivo: boolean;
      position: {
        idu_rol: number;
        nom_rol: string;
      };
    };
}
