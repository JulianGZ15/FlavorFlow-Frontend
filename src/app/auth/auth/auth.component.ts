import { Component, OnInit } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../services/loginRequest';
import { User } from '../../models/user';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    
    MatFormFieldModule, 
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    RegistroComponent,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ToastrModule,
    
  ],

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
  restaurante !: Restaurante;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService,
              private restauranteService: RestauranteService){
    this.loginForm = this.fb.group({

      username:['', Validators.required],
      password:['', Validators.required],

    })

  }

  get username(){
    return this.loginForm.controls['username'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }




  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) =>{
        console.log(userData);
        console.log(User)
      },

        error: (errorData)=>{
          console.error(errorData);
          this.toastr.error(errorData);
        },
        
        complete: () => {

          
          
          
                  console.info("Login completo")
                        this.router.navigateByUrl('/dashboard/admin');
                        this.loginForm.reset();
          
        }

      })

    }
    else{
      this.toastr.error("Error al ingresar datos");
    }

  }

  registro(){
    this.router.navigateByUrl('/registro');

  }

}
