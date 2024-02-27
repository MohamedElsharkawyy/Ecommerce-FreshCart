import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  numberOfWishlistCards:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor( private _HttpClient:HttpClient) { }
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/";

  addToWishlist( id:string | undefined ):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'wishlist',{
      productId:id
    });
  }

  getWishlist():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'wishlist');
  }
  removeFromWishlist(productId: string | undefined):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + 'wishlist/'+productId)
  }
}
