import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { comandaC } from '../models/comandaC';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class comandaCService {

  private url: string = 'http://localhost:8080/api/comanda_create';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  createcomandaC(idVenta:String, comandaC: comandaC): Observable<any>{
    return this.http.post(this.url + "/" + idVenta, comandaC, { headers: this.getHeaders() })
  }


  editcomandaC(id: string, comandaC: comandaC ): Observable<any>{
    return this.http.put(this.url + '/' + id, comandaC, { headers: this.getHeaders() });
  }
}
