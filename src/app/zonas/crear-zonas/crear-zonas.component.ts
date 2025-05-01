import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ZonasService } from '../../services/zonas.service';
import { Zona } from '../../models/zonas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-zonas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ToastrModule,
  ],
  templateUrl: './crear-zonas.component.html',
  styleUrl: './crear-zonas.component.css'
})
export class CrearZonasComponent implements OnInit {

  
  zonaForm: FormGroup;

  titulo = 'crear zona'
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: ZonasService,
    private aRouter: ActivatedRoute) {
    this.zonaForm = this.fb.group({

      nombre: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarZona() {
    console.log(this.zonaForm);



    const Zona: Zona = {
      cve_zona: 0,
      cve_restaurante: 0,
      nombre: this.zonaForm.get('nombre')?.value,
    }

    if(this.id !== null){
      //editar zona
      this.service.editZona(this.id, Zona).subscribe(data=>{
        this.toastr.success('La zona fue editada con exito!', 'Zona Editada!');
        this.router.navigate(['/dashboard/zonas/listazonas'])
      })
    }else{
      //creamos zona
      this.service.createZona(Zona).subscribe(data => {
        this.toastr.success('La zona fue registrada con exito!', 'Zona Registrada!');
        this.router.navigate(['/dashboard/zonas/listazonas'])
      })
  
  
    }


  }

  esEditar() {
    if (this.id !== null) {
      console.log(this.id)
      this.titulo = 'Editar Zona';
      this.service.obtenerZona(this.id).subscribe(data => {
        this.zonaForm.setValue({
          nombre: data.nombre,

        })
      })
    }
  }





}
