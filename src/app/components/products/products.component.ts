import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextsPipe } from 'src/app/core/pipes/cuttexts.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    imports: [CommonModule, RouterLink, CuttextsPipe, NgxPaginationModule, SearchPipe , FormsModule]
})
export class ProductsComponent implements OnInit{

  constructor(private _ProductsService:ProductsService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _WishlistService:WishlistService
  ){};
  term:string = '';
  pageSize:number = 0;
  currentPage:number = 1;
  total:number = 0;
  products:Product[]=[];
  wishlistProductId:string[] = [];
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        this.wishlistProductId = response.data.map((item:any)=> item._id);
      }
    })
  }
  addProductToCart(id:any , element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,"disabled");
        this._CartService.cartNumber.next(response.numOfCartItems);
      },error:(error)=>{
        this._Renderer2.removeAttribute(element,"disabled");
      }
    })
  }
  pageChanged(event:any):void{
    this._ProductsService.getProducts(event).subscribe({
      next:(response)=>{
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  addProductToWishList(productId:string | undefined ){
    this._WishlistService.addToWishlist(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishlistProductId = response.data;
        this._WishlistService.numberOfWishlistCards.next(response.data.length);
      },
      error:(error)=>{

      }
    })
  }
  removeProductFromWishlist(productId : string | undefined){
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishlistProductId = response.data;
        this._WishlistService.numberOfWishlistCards.next(response.data.length);
      }
    })
  }
}
