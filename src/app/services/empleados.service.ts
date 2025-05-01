import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleados } from '../models/empleados';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {



    private url: string = 'http://localhost:8080/api/personal';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }

    getEmpleados(): Observable<Empleados[]>{
     return this.http.get<Empleados[]>(this.url,  { headers: this.getHeaders() } );
    }

    getEmpleadosById(id: string): Observable<Empleados>{
      return this.http.get<Empleados>(this.url + '/' + id,  { headers: this.getHeaders() } );
     }

    deleteEmpleado(id: number): Observable<any>{
      return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
    }

    createEmpleado(producto: Empleados): Observable<any>{
      return this.http.post(this.url, producto, { headers: this.getHeaders() })
    }

    obtenerEmpleado(id: string): Observable<any>{
      return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
    }

    editEmpleado(id: string, producto: Empleados ): Observable<any>{
      return this.http.put(this.url + '/' + id, producto, { headers: this.getHeaders() });
    }


    verificarNIP(idEmpleado: string, nipIngresado: number): Observable<boolean> {
      return this.http.post<boolean>(`${this.url}/${idEmpleado}/verificar-nip`, { nip: nipIngresado }, { headers: this.getHeaders() });
    }
}
