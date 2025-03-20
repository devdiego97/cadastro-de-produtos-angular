import { IProduct } from '../../models/product';
import { Observable } from "rxjs";




export interface IProductService{
 listAllProducts():Observable<IProduct[]>
 findBydId(id:number):Observable<IProduct>
 updatePetBydId(id:number,data:Omit<IProduct,"id">):Observable<IProduct>
 deleteBydId(id:number):Observable<void>
 createnewProduct(data:Omit<IProduct,"id">):Observable<IProduct>

}
