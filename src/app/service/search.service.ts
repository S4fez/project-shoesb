import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products,Shoes } from '../product';
import { environment } from '../environment/environment';
import { Stock } from '../stock';

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