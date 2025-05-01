import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comanda } from '../models/comanda';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  private url: string = 'http://localhost:8080/api/comanda';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getComandas(): Observable<Comanda[]>{
   return this.http.get<Comanda[]>(this.url,  { headers: this.getHeaders() } );
  }

  getComandaById(id: number): Observable<Comanda>{
    return this.http.get<Comanda>(this.url +'/'+ id,  { headers: this.getHeaders() } );
   }


  deleteComanda(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createComanda(comanda: Comanda): Observable<any>{
    return this.http.post(this.url, comanda, { headers: this.getHeaders() })
  }

  obtenerComanda(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editComanda(id: string, comanda: Comanda ): Observable<any>{
    return this.http.put(this.url + '/' + id, comanda, { headers: this.getHeaders() });
  }
}
