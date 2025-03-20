import { Component } from '@angular/core';
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { OnInit} from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { ServicesToken } from '../../services.token';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../models/product';




@Component({
  selector: 'app-products',
  imports: [LayoutComponent,CardProductComponent,CommonModule],
   providers:[{provide:ServicesToken.HTTP.PRODUCTS,useClass:ProductsService},HttpClient],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
listProducts:IProduct[] =[]

  constructor(
   private httpService:ProductsService

  ) {}

  ngOnInit(): void {
    this.loadingProducts()
  }

  loadingProducts(){
    this.httpService.listAllProducts().subscribe({
      next:(response)=>{
        this.listProducts=response
        console.log(response)
      },
      error:()=>{

      }
    })
  }




}
