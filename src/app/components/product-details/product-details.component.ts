import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _ProductsService:ProductsService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService
    ){};
  productId!:string|null;
  productDetails:any = null;
  ngOnInit():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId = params.get('id');
      }
    });
    this._ProductsService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
        this.productDetails = data;
      }
    });
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
  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:6000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
}

