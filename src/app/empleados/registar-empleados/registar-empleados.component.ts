import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleados } from '../../models/empleados';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../services/empleados.service';
import { Paises } from '../../models/paises';
import { Estados } from '../../models/estados';
import { Puesto } from '../../models/puestos';
import { PuestosService } from '../../services/puestos.service';
import { PaisesService } from '../../services/paises.service';
import { EstadosService } from '../../services/estados.service';

@Component({
  selector: 'app-registar-empleados',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,

  ],
  templateUrl: './registar-empleados.component.html',
  styleUrl: './registar-empleados.component.css'
})
export class RegistarEmpleadosComponent implements OnInit {

  titulo = 'Crear empleado';
  id: string | null;

  empleadoForm: FormGroup;

  paises: Paises[] = []; // Array para almacenar los paises
  estados: Estados[] = []; // Array para almacenar los estados
  puestos: Puesto[] = []; // Array para almacenar los puestos

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: EmpleadosService,
    private paisesService: PaisesService, // Servicio para obtener los paises
    private estadosService: EstadosService, // Servicio para obtener los estados
    private puestosService: PuestosService, // Servicio para obtener los puestos
    private route: ActivatedRoute
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      edad: ['', Validators.required],
      fechaContratacion: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      puesto: ['', Validators.required],
      nipAcceso: ['', Validators.required],

    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerPaises(); // Obtener la lista de paises al iniciar el componente
    this.obtenerPuestos(); // Obtener la lista de puestos al iniciar el componente
    this.esEditar();
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

  obtenerPuestos() {
    this.puestosService.getPuestos().subscribe(puestos => {
      this.puestos = puestos;
    });
  }

  agregarEmpleado() {
    const empleado: Empleados = {
      cve_empleado: this.empleadoForm.get('edad')?.value,
      nombre: this.empleadoForm.get('nombre')?.value,
      paterno: this.empleadoForm.get('paterno')?.value,
      materno: this.empleadoForm.get('materno')?.value,
      edad: this.empleadoForm.get('edad')?.value,
      fecha_contratacion: this.empleadoForm.get('fechaContratacion')?.value,
      nip:this.empleadoForm.get('nipAcceso')?.value,
      direccion: {
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
      puesto: this.empleadoForm.get("puesto")?.value
    };

    console.log(empleado)

    if (this.id !== null) {
      this.service.editEmpleado(this.id, empleado).subscribe(data => {
        this.toastr.success('El empleado fue editado con éxito!', 'Empleado Editado');
        this.router.navigate(['/dashboard/empleados/listaempleados']);
      });
    } else {
      this.service.createEmpleado(empleado).subscribe(data => {
        this.toastr.success('El empleado fue registrado con éxito!', 'Empleado Registrado');
        this.router.navigate(['/dashboard/empleados/listaempleados']);
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.service.obtenerEmpleado(this.id).subscribe(data => {
        this.empleadoForm.setValue({
          nombre: data.nombre,
          paterno: data.paterno,
          materno: data.materno,
          edad: data.edad,
          fechaContratacion: data.fecha_contratacion,
          calle: data.direccion?.calle || '',
          numero: data.direccion?.numero || '',
          colonia: data.direccion?.colonia || '',
          codigoPostal: data.direccion?.codigo_postal || '',
          estado: data.direccion?.estado || '',
          pais: data.direccion.estado.pais.cve_pais || '', // Debes obtener el pais del estado
          puesto: data.puesto.cve_puesto || ''
        });
        // Obtener estados por el pais seleccionado
        this.obtenerEstados(data.direccion.estado.pais.cve_pais);
      });
    }
  }
}
