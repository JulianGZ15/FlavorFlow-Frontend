import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarZonasComponent } from './listar-zonas/listar-zonas.component';
import { CrearZonasComponent } from './crear-zonas/crear-zonas.component';

const routes: Routes = [
  {path:'listazonas', component: ListarZonasComponent},
  {path:'crearzona', component: CrearZonasComponent},
  {path:'editarzona/:id', component: CrearZonasComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ZonasRoutingModule { }
