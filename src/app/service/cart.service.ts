import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  qty: number;
  size: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  getItems(): CartItem[] { return this.items; }

  addItem(product: Product, size: string, qty: number = 1): void {
    const existing = this.items.find(i => i.product.id === product.id && i.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ product, qty, size });
    }
    this.updateCount();
  }

  removeItem(productId: string, size: string): void {
    this.items = this.items.filter(i => !(i.product.id === productId && i.size === size));
    this.updateCount();
  }

  updateQty(productId: string, size: string, qty: number): void {
    const item = this.items.find(i => i.product.id === productId && i.size === size);
    if (item) { item.qty = qty; }
    this.updateCount();
  }

  getSubtotal(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }

  getCount(): number {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  clear(): void {
    this.items = [];
    this.updateCount();
  }

  private updateCount(): void {
    this.countSubject.next(this.getCount());
  }
}
