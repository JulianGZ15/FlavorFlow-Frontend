import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    CrearProductoComponent,
    ListarProductoComponent
  ]
})
export class ProductosModule { }
