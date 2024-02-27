import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextsPipe } from 'src/app/core/pipes/cuttexts.pipe';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextsPipe, CarouselModule, RouterLink , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
    ){};
  term:string = '';
  products:Product[]=[];
  brands:any[]=[];
  categories:Category[]=[];
  wishlistProductId:string[] = [];
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        this.products = response.data;
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this._ProductsService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data;
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        this.wishlistProductId = response.data.map((item:any)=>{
          return item._id;
        });
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

  addProductToWishList(id:string | undefined):void{
    this._WishlistService.addToWishlist(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishlistProductId = response.data;
        this._WishlistService.numberOfWishlistCards.next(response.data.length);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  removeProductFromWishlist(id:string | undefined):void{
    this._WishlistService.removeFromWishlist(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishlistProductId = response.data;
        this._WishlistService.numberOfWishlistCards.next(response.data.length);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  // owl-carousel library
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:6000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1500,
    navText: ['', ''],
    items:1,
    nav: false
  }
}
