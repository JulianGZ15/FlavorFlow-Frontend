import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule,Routes } from '@angular/router';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path:'main', component: MainComponent},
  {path:'listaproductos', component: ListarProductoComponent},
  {path:'crearproductos', component: CrearProductoComponent},
  {path:'editarproducto/:id', component: CrearProductoComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProductosRoutingModule { }
