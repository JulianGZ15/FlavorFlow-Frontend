import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puesto } from '../models/puestos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  

  private url: string = 'http://localhost:8080/api/puestos';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getPuestos(): Observable<Puesto[]>{
   return this.http.get<Puesto[]>(this.url,  { headers: this.getHeaders() } );
  }


  deletePuesto(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createPuesto(puesto: Puesto): Observable<any>{
    return this.http.post(this.url, puesto, { headers: this.getHeaders() })
  }

  obtenerPuesto(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editPuesto(id: string, puesto: Puesto ): Observable<any>{
    return this.http.put(this.url + '/' + id, puesto, { headers: this.getHeaders() });
  }
}
