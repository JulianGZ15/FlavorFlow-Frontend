import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarPuestosComponent } from './listar-puestos/listar-puestos.component';
import { CrearPuestosComponent } from './crear-puestos/crear-puestos.component';


const routes: Routes = [
  {path:'listapuestos', component: ListarPuestosComponent},
  {path:'crearpuesto', component: CrearPuestosComponent},
  {path:'editarpuesto/:id', component: CrearPuestosComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PuestosRoutingModule { }
