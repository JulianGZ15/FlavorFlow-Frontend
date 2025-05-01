import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';


const routes: Routes = [
  {path:'listaventas', component: ListarVentasComponent},
  {path:'detalleventa/:id', component: DetalleVentaComponent},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class VentasRoutingModule { }
