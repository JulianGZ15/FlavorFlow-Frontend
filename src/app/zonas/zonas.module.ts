import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonasRoutingModule } from './zonas-routing.module';
import { CrearZonasComponent } from './crear-zonas/crear-zonas.component';
import { ListarZonasComponent } from './listar-zonas/listar-zonas.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ZonasRoutingModule,
    CrearZonasComponent,
    ListarZonasComponent
  ]
})
export class ZonasModule { }
