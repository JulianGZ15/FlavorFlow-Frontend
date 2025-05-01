import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../services/loginRequest';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth-orders',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ToastrModule,
  ],
  templateUrl: './auth-orders.component.html',
  styleUrl: './auth-orders.component.css'
})
export class AuthOrdersComponent {

  
  

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService){
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
          this.router.navigateByUrl('/orders/empleados');
          this.loginForm.reset();
        }

      })

    }
    else{
      this.toastr.error("Error al ingresar datos");
    }

  }
}
