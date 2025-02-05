import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Stock } from '../stock';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisibleSource.asObservable();

  // private paymentVisibleSource = new BehaviorSubject<boolean>(false);
  // paymentVisible$ = this.paymentVisibleSource.asObservable();

  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getStock(productid:number): Observable<Stock[]> {
    const url = `${this.apiUrl}productstore/${productid}`;
    return this.http.get<Stock[]>(url);
  }
  
  postSizeID(sizeid:string): Observable<Stock[]> {
    const url = `${this.apiUrl}productstore/bucket/`;
    const body = {sizeId:JSON.parse(sizeid)};
    return this.http.post<Stock[]>(url,body);
  }

  payment(data: { productsize_id: number; quantity: number }[]): Observable<Stock[]> {
    console.log('DATApayment',data)
    const url = `${this.apiUrl}/productstore/paybucket`;
    const payload = data.map(item => ({
      sizeId: item.productsize_id,
      quantity: item.quantity
    }));
    console.log('payloadpayment',payload)
    return this.http.post<Stock[]>(url, payload);
  }
  

  openCart() {
    this.cartVisibleSource.next(true);
  }

  closeCart() {
    this.cartVisibleSource.next(false);
  }


}
