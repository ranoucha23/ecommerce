import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrlProduct :string = environment.baseurl+"/product"

  constructor(private http: HttpClient) { }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post(`${this.baseUrlProduct}/saveProduct`, product)
    .pipe(
      map((response:any) => response as Product)
    );
  }

  uploadProductImage(id:number,image:File): Observable<HttpEvent<{}>> {
    const formData:FormData=new FormData();
    formData.append(`image`,image)
    let url=this.baseUrlProduct+"/uploadProductImage/"+id;
    const req=new HttpRequest('POST',url,formData,{reportProgress:true,responseType:'text'})
    return this.http.request(req);
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrlProduct}/getAllProducts`)
    .pipe(
      map((response:any) => response as Product[])
    );
    
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrlProduct}/deleteProduct/${id}`,{ responseType: 'text' });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get(`${this.baseUrlProduct}/getProduct/${id}`).pipe(
      map((response:any) => response as Product)
    );
  }

}
