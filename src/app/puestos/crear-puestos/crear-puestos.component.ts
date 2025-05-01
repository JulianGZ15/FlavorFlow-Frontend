import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PuestosService } from '../../services/puestos.service';
import { Puesto } from '../../models/puestos';

@Component({
  selector: 'app-crear-puestos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ToastrModule,
  ],
  templateUrl: './crear-puestos.component.html',
  styleUrl: './crear-puestos.component.css'
})
export class CrearPuestosComponent implements OnInit {

  
  PuestoForm: FormGroup;

  titulo = 'crear puesto'
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: PuestosService,
    private aRouter: ActivatedRoute) {
    this.PuestoForm = this.fb.group({

      nombre: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarPuesto() {
    console.log(this.PuestoForm);



    const Puesto: Puesto= {
      cve_puesto: 0,
      cve_restaurante: 0,
      nombre: this.PuestoForm.get('nombre')?.value,
    }

    if(this.id !== null){
      //editar Puesto
      this.service.editPuesto(this.id, Puesto).subscribe(data=>{
        this.toastr.success('El Puesto fue editado con exito!', 'Puesto Editado!');
        this.router.navigate(['/dashboard/puestos/listapuestos'])
      })
    }else{
      //creamos Puesto
      this.service.createPuesto(Puesto).subscribe(data => {
        this.toastr.success('El puesto fue registrado con exito!', 'Puesto Registrado!');
        this.router.navigate(['/dashboard/puestos/listapuestos'])
      })
  
  
    }


  }

  esEditar() {
    if (this.id !== null) {
      console.log(this.id)
      this.titulo = 'Editar Puesto';
      this.service.obtenerPuesto(this.id).subscribe(data => {
        this.PuestoForm.setValue({
          nombre: data.nombre,

        })
      })
    }
  }





}
