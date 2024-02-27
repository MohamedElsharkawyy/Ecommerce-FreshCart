import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand } from 'src/app/core/interfaces/brand';
import { BrandService } from 'src/app/core/services/brand.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  brandList:brand[]=[];
  isLoding:boolean=true;

  constructor(private _BrandService:BrandService){}
  ngOnInit(): void {
    this.getAllbrands();
  }
  getAllbrands(){
    this._BrandService.getAllBrands().subscribe({
      next : response => {
        this.isLoding=false
        this.brandList=response.data;
      },
      error : err => {
        this.isLoding=false

      }
    })

  }

}
