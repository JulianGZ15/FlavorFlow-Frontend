import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ListarVentasComponent,
    DetalleVentaComponent
  ]
})
export class VentasModule { }
