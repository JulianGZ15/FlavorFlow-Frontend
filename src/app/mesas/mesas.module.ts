import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesasRoutingModule } from './mesas-routing.module';
import { RegistrarMesasComponent } from './registrar-mesas/registrar-mesas.component';
import { ListarMesasComponent } from './listar-mesas/listar-mesas.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MesasRoutingModule,
    RegistrarMesasComponent,
    ListarMesasComponent,
  ]
})
export class MesasModule { }
