import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { };
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);
  
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/";
  addToCart(id:string | undefined):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'cart',{
      productId:id,
    });
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'cart');
  }
  removeCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${id}`);
  }
  updateCartCount(id:string , newCountValue:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${id}`,
      {
        count:newCountValue,
      });
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl+"cart");
  }
  checkOut(id:string|null,orderForm:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +`orders/checkout-session/${id}?url=https://ecommerce-fresh-cart-two.vercel.app`,{
      shippingAddress:orderForm,
    });
  }
}
