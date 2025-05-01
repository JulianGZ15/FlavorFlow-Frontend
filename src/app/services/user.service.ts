import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url: string = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) { }


  getUser(id: number): Observable<User>{
   return this.http.get<User>(this.url+id).pipe(
    catchError(this.handleError)
   )

  }

  updateUser(userRequest:User):Observable<any>{
    return this.http.put(this.url, userRequest).pipe(
      catchError(this.handleError)
    )
  }

  createUser(user: User): Observable<any>{
    return this.http.post(this.url, user).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('se haproducido un error ', error.error)
    }
      else{
        console.error('Backend retorno el codigo de estado ', error.error)
      }

      return throwError(()=> new Error('Algo fallo. Por favor intente de nuevo. '))
  }





  login(credentials:any){
    console.log(credentials);
  }
}
