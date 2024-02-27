import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/auth/";

  register(registerForm:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'signup', registerForm);
  }
  signIn(signInFrom:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'signin', signInFrom);
  }
}
