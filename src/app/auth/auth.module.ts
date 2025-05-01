import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthComponent,
    RegistroComponent,
  ]
})
export class AuthModule { }
