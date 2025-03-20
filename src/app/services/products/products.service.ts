import { Injectable } from '@angular/core';
import { IProductService } from './iproduct.model';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements IProductService {



   private readonly baseUrl=environment.apiBaseUrl



  constructor(
    private http:HttpClient

  ) { }
  listAllProducts(): Observable<IProduct[]> {

  return this.http.get<IProduct[]>(`${this.baseUrl}products`)


  }
  findBydId(id: number): Observable<IProduct> {
    throw new Error('Method not implemented.');
  }
  updatePetBydId(id: number, data: Omit<IProduct, 'id'>): Observable<IProduct> {
    throw new Error('Method not implemented.');
  }
  deleteBydId(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  createnewProduct(data: Omit<IProduct, 'id'>): Observable<IProduct> {
    console.log('Payload enviado:', data)
        return this.http.post<IProduct>(`${this.baseUrl}products`,{data})
  }
}
