import { Mesas } from "./mesas";
import { Venta } from "./ventas";
import { Detalle } from "./detalle";

export class Comanda{

 cve_comanda !:number;
 fecha !: Date;
 mesa !: Mesas;
 venta !: Venta;
 items !: Detalle[];

}