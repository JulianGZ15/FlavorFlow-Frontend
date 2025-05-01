import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarEmpleadosComponent } from './listar-empleados/listar-empleados.component';
import { RegistarEmpleadosComponent } from './registar-empleados/registar-empleados.component';
import { EmpleadosRoutingModule } from './empleados-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    ListarEmpleadosComponent,
    RegistarEmpleadosComponent,

  ]
})
export class EmpleadosModule { }
