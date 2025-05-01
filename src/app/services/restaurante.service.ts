import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private url: string = 'http://localhost:8080/api/restaurante';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getRestaurante(): Observable<Restaurante[]>{
   return this.http.get<Restaurante[]>(this.url,  { headers: this.getHeaders() } );
  }


  deleteRestaurante(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createRestaurante(producto: Restaurante): Observable<any>{
    return this.http.post(this.url, producto, { headers: this.getHeaders() })
  }

  obtenerRestaurante(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editRestaurante(id: string, producto: Restaurante ): Observable<any>{
    return this.http.put(this.url + '/' + id, producto, { headers: this.getHeaders() });
  }
}
