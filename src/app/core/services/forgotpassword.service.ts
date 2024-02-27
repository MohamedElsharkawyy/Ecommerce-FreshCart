import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private _HttpClient:HttpClient) { };
  basUrl:string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(this.basUrl + "forgotPasswords",userEmail);
  }
  resetCode(code:object):Observable<any>{
    return this._HttpClient.post(this.basUrl + "verifyResetCode",code);
  }
  resetPassword(password:object):Observable<any>{
    return this._HttpClient.put(this.basUrl + "resetPassword",password);
  }
}
