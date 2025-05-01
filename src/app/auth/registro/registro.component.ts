import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ToastrModule,
    CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private service: RegisterService){
    this.userForm = this.fb.group({

      nombre:['', Validators.required],
      apellido:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],

    })



  }



  crearUsuario(){

    const user: User = {
      id:0,
      nombre: this.userForm.get('nombre')?.value,
      apellido: this.userForm.get('apellido')?.value,
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
    }

    this.service.createUser(user).subscribe(data => {
      this.toastr.success('Cuenta creada exitosamente, Inicia sesion por primera vez', 'Cuenta creada exitosamente')
      this.router.navigate(['/adminlogin'])
    })


  }

}
