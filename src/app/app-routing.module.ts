import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {path:'',canActivate:[authGuard],loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
    children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:'home'},
    {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent),title:'categories'},
    {path:'categorydetails/:id',loadComponent:()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent), title:'category details'},
    {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),title:'cart'},
    {path:'products',loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent),title:'products'},
    {path:'productdetails/:id', loadComponent:()=>import('./components/product-details/product-details.component').then((m)=>m.ProductDetailsComponent),title:"product details"},
    {path:'payment/:cartId',loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:"online payment"},
    {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent),title:"all orders"},
    {path:'forgotpassword',loadComponent:()=>import('./components/forgotpassword/forgotpassword.component').then((m)=>m.ForgotpasswordComponent),title:"forgot password"},
    {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent),title:'Brands'},
    {path:'wishlist',loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent) , title:"wishlist"}
  ]},

  {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
    children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:'login'},
    {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:'register'},
    {path:'forgotpass',loadComponent:()=>import('./components/forgotpassword/forgotpassword.component').then((m)=>m.ForgotpasswordComponent),title:"forgot password"}
  ]},

  {path:"**",loadComponent:()=>import('./components/not-found/not-found.component').then((m)=>m.NotFoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
