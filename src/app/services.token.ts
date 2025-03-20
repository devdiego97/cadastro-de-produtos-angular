import { InjectionToken } from "@angular/core";
import { IProductService } from "./services/products/iproduct.model";


export const ServicesToken={
 HTTP:{
   PRODUCTS:new InjectionToken<IProductService>("ServicesToken.HTTP.PRODUCTS")
 }
}
