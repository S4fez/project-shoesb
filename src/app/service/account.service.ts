import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products,Shoes } from '../product';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl

 // เพิ่ม apiUrl ไว้ที่นี่

  constructor(private http: HttpClient) { 
    
  }
  getShoeById(productid:number): Observable<any> {
    return this.http.get<Shoes>(`${this.apiUrl}/productdetail/${productid}`);
  }

  getUser(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/productbasketball/${id}`);
  }

  // Example GET request
  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productbasketball`);
  }
  getDetail(productid:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productdetail/`+ productid);
  }
  getStores(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  getBrand(brandid:number): Observable<Shoes[]> {
    const url = `${this.apiUrl}/productbrand/${brandid}`;
    return this.http.get<Shoes[]>(url);
  }
  postAccount(username:string,password:string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }
  postRegis(username:string,password:string,email:string):Observable<any> {
    const body = {
      usernamehash:username,
      passwordhash:password,
      email:email
    };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }

  getProfile(id:number):Observable<any>{
    const body={
      userId:id
    };
    return this.http.post<any>(`${this.apiUrl}/userprofile`,body);
  }
  
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploads`, formData);
  }

}