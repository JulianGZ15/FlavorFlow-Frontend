import { Estados } from "./estados";

export class Direccion{
    calle!: string;
    numero!: number;
    colonia!: string;
    codigo_postal!: number;
    estado !: Estados;
}