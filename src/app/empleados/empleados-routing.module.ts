import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarEmpleadosComponent } from './listar-empleados/listar-empleados.component';
import { RegistarEmpleadosComponent } from './registar-empleados/registar-empleados.component';
import { DetalleEmpleadoComponent } from './detalle-empleado/detalle-empleado.component';

const routes: Routes = [
  {path:'listaempleados', component: ListarEmpleadosComponent},
  {path:'registrarempleado', component: RegistarEmpleadosComponent},
  {path:'editarempleado/:id', component: RegistarEmpleadosComponent},
  {path:'datosempleado/:id', component: DetalleEmpleadoComponent}



]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmpleadosRoutingModule { }
