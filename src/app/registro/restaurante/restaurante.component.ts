import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RestauranteService } from '../../services/restaurante.service';
import { CommonModule } from '@angular/common';
import { Estados } from '../../models/estados';
import { Paises } from '../../models/paises';
import { PaisesService } from '../../services/paises.service';
import { EstadosService } from '../../services/estados.service';
import { Restaurante } from '../../models/restaurante';

@Component({
  selector: 'app-restaurante',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ToastrModule,
  ],
  templateUrl: './restaurante.component.html',
  styleUrl: './restaurante.component.css'
})
export class RestauranteComponent  {
  
  
  titulo = 'Crear empleado';

  empleadoForm: FormGroup;

  paises: Paises[] = []; // Array para almacenar los paises
  estados: Estados[] = []; // Array para almacenar los estados

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: RestauranteService,
    private paisesService: PaisesService, // Servicio para obtener los paises
    private estadosService: EstadosService, // Servicio para obtener los estados
    private route: ActivatedRoute
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      puesto: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.obtenerPaises(); // Obtener la lista de paises al iniciar el componente

  }

  cargarEstadosPorPais() {
    const paisControl = this.empleadoForm.get('pais');
    if (paisControl && paisControl.value) {
      const paisSeleccionado = paisControl.value;
      this.obtenerEstados(paisSeleccionado);
    }
  }

  obtenerPaises() {
    this.paisesService.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  obtenerEstados(cve_pais: number) {
    this.estadosService.getEstados(cve_pais).subscribe(estados => {
      this.estados = estados;
    });
  }

 

  registrarRestaurante() {
    const restaurante: Restaurante = {
      cve_restaurante: 0,
      nombre: this.empleadoForm.get('nombre')?.value,
      domicilio: {
        calle: this.empleadoForm.get('calle')?.value,
        numero: this.empleadoForm.get('numero')?.value,
        colonia: this.empleadoForm.get('colonia')?.value,
        codigo_postal: this.empleadoForm.get('codigoPostal')?.value,
        estado: {
          cve_estado: this.empleadoForm.get('estado')?.value,
          nombre: '',
          pais:{
            cve_pais: this.empleadoForm.get('pais')?.value,
            nombre: ''
          }
        },
      },
    };

    console.log(restaurante)

    this.service.createRestaurante(restaurante).subscribe(data => {
      this.toastr.success('El Restaurante fue registrado con éxito!', 'Restaurante Registrado');
      this.router.navigate(['/dashboard/admin']);
    });

  }








}
