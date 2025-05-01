import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {BreakpointObserver} from '@angular/cdk/layout'
import { PagesModule } from './pages.module';
import { ProductosModule } from '../productos/productos.module'; 
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { RestauranteService } from '../services/restaurante.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductosModule,
    RouterOutlet, 
    RouterModule,
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

  ],

  template: `<div *ngIf="visible">Hi</div>`,

  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
  
})
export class PagesComponent implements OnInit {


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


user !:User;

constructor(private userService:UserService,
  private router: Router,
  private service: RestauranteService,
){
  
  

}
  ngOnInit(): void {
    if(this.service.getRestaurante() == null){
      this.router.navigate(['/restaurante/registrar_restaurante'])

    }


    this.userService.getUser(8).subscribe(
      data=>{
        this.user = data
      }
    )

  }




  accederOrders(){
    this.router.navigateByUrl('/orderslogin');

  }


}