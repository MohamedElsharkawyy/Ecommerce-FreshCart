import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CuttextsPipe } from 'src/app/core/pipes/cuttexts.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule , FormsModule , SearchPipe , RouterLink , CuttextsPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  constructor(
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService
    ){};

  ngOnInit(): void {
    this.getWishlistData();
  }
  term:string = '';
  wishlist:any = '';
  productId:string [] = [];
  getWishlistData():void{
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        this.wishlist = response.data;
        this.productId = this.wishlist.map((item:any)=>{
          return item._id;
        })
        console.log(this.wishlist);
        console.log(this.productId)
      },
      error:(error)=>{

      }
    })
  }
  removeProductFromWishlist(productId:string | undefined):void{
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.productId = response.data;
        this._WishlistService.numberOfWishlistCards.next(response.data.length);
      }
    })
  }
  addProductToCart(productId:string | undefined, element:HTMLButtonElement){
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,"disabled");
        this._CartService.cartNumber.next(response.numOfCartItems);
      },error:(error)=>{
        this._Renderer2.removeAttribute(element,"disabled");
      }
    })
  }
}
