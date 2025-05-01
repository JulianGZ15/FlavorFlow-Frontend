import { Comanda } from "./comanda";
import { Mesas } from "./mesas";

export class Venta{
    cve_venta !: number;
    importe!: number;
    iva !: number;
    total !: number;
    estatus !: number;
    fecha !: Date;

    comandas!:Comanda[];
    mesa!: Mesas
}