import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrlCategory :string = environment.baseurl+"/category"

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrlCategory}/getAllCategories`)
    .pipe(
      map((response:any) => response as Category[])
    );
    
  }
}
