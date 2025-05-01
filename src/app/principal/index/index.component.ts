import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../../auth/auth.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterModule,
    AuthModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(private router: Router){}

  acceder(){
    this.router.navigateByUrl('/adminlogin');

  }

  accederOrders(){
    this.router.navigateByUrl('/orderslogin');

  }

}
