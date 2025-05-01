import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarMesasComponent } from './listar-mesas/listar-mesas.component';
import { RegistrarMesasComponent } from './registrar-mesas/registrar-mesas.component';

const routes: Routes = [
  {path:'listamesas', component: ListarMesasComponent},
  {path:'registrarmesas', component: RegistrarMesasComponent},
  {path:'editarmesa/:id/:id_zona', component: RegistrarMesasComponent}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MesasRoutingModule { }
