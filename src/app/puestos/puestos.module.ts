import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuestosRoutingModule } from './puestos-routing.module';
import { CrearPuestosComponent } from './crear-puestos/crear-puestos.component';
import { ListarPuestosComponent } from './listar-puestos/listar-puestos.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PuestosRoutingModule,
    CrearPuestosComponent,
    ListarPuestosComponent
  ]
})
export class PuestosModule { }
