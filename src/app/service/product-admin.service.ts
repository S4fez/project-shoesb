import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/products`);
  }

  getAllBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/brands`);
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/products`, formData);
  }

  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/products/${productId}`, formData);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/products/${productId}`);
  }
}
