import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private items: Product[] = [];
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  getItems(): Product[] { return this.items; }

  toggle(product: Product): void {
    const idx = this.items.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      this.items.splice(idx, 1);
    } else {
      this.items.push(product);
    }
    this.countSubject.next(this.items.length);
  }

  isInWishlist(productId: string): boolean {
    return this.items.some(p => p.id === productId);
  }

  getCount(): number { return this.items.length; }
}
