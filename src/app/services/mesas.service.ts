import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Mesas } from '../models/mesas';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private url: string = 'http://localhost:8080/api/mesas';

  constructor(private http: HttpClient) { }



  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getMesas(): Observable<Mesas[]>{
   return this.http.get<Mesas[]>(this.url,  { headers: this.getHeaders() } );
  }

  getMesaById(id: string): Observable<Mesas>{
    return this.http.get<Mesas>(this.url + '/' + id,  { headers: this.getHeaders() } );
   }

  deleteMesa(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createMesa(mesa: Mesas, cve_zona: Number): Observable<any>{
    return this.http.post(this.url + '/' + cve_zona, mesa, { headers: this.getHeaders() })
  }

  obtenerMesa(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editMesa(id: string, cve_zona: string, mesa: Mesas): Observable<any>{
    return this.http.put(this.url + '/' + id + '/' + cve_zona, mesa, { headers: this.getHeaders() });
  }
}
