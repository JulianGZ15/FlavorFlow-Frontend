import { Direccion } from "./direccion";
import { Puesto } from "./puestos";

export class Empleados{
    cve_empleado!:number;
    nombre!:string;
    paterno!:string; 
    materno!:string; 
    edad!:number; 
    fecha_contratacion!:Date;
    nip!:number

    puesto!: Puesto;
    direccion!: Direccion;
}