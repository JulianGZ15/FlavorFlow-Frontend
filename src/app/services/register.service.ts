import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) { }



  createUser(user: User): Observable<any>{
    return this.http.post(this.url, user)
  }
}
