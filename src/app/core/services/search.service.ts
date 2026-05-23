import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Shoes } from '../models/product.model';
import { environment } from '../../environment/environment';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private apiUrl = environment.apiUrl
    constructor(private http: HttpClient) {   }

    getSearch(name:string): Observable<Stock[]> {
        const url = `${this.apiUrl}/search`;
        const body = {
          name: name
        };
        return this.http.post<Stock[]>(url,body);
      }
}
