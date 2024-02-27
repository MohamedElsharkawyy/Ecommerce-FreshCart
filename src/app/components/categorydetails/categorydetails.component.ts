import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {
constructor(
  private _ActivatedRoute:ActivatedRoute,
  private _ProductsService:ProductsService
  ){

}
categoryData : Category = {
  name: '',
  image: ''
};
categoryId:string | null = '';
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(parmas)=>{
      this.categoryId = parmas.get('id');
      this.getCategory();
    }
  })
}
getCategory():void{
  this._ProductsService.getCategoryDetails(this.categoryId).subscribe({
    next:(response)=>{
      this.categoryData = response.data;
    }
  })
}
}
