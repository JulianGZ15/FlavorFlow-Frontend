import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestauranteComponent } from './restaurante/restaurante.component';

const routes: Routes = [
  {path:'registrar_restaurante', component: RestauranteComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class RegistroRoutingModule { }
