import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {BreakpointObserver} from '@angular/cdk/layout'
import { PagesModule } from './pages/pages.module';
import { ProductosModule } from './productos/productos.module';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { ListarProductoComponent } from './productos/listar-producto/listar-producto.component';
import { ProductosRoutingModule } from './productos/productos-routing.module';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductosModule,
    RouterOutlet, 
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    PagesModule,
    AuthModule,
    ToastrModule,
    CrearProductoComponent,
    ListarProductoComponent,
    ProductosRoutingModule



  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide: HTTP_INTERCEPTORS,useClass:ErrorInterceptorService, multi:true}
  ],

  template: `<div *ngIf="visible">Hi</div>`,

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'FlavorFlowFront';
  enabled: boolean = false;

  setEnabled(): void{
    this.enabled = true;
  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef){
   
}

}