import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem extends Product { qty: number; size: string; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  get items()    { return this._items$.value; }
  get count()    { return this.items.length; }
  get subtotal() { return this.items.reduce((s,i) => s + i.price * i.qty, 0); }
  get shipping() { return this.subtotal > 2000 ? 0 : 80; }
  get total()    { return this.subtotal + this.shipping; }

  add(product: Product, size: string, qty: number) {
    const cur = this._items$.value;
    const idx = cur.findIndex(i => i.id === product.id && i.size === size);
    if (idx >= 0) {
      const updated = [...cur];
      updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
      this._items$.next(updated);
    } else {
      this._items$.next([...cur, { ...product, size, qty }]);
    }
  }

  updateQty(index: number, delta: number) {
    const items = [...this._items$.value];
    const nq = items[index].qty + delta;
    if (nq < 1) return;
    items[index] = { ...items[index], qty: nq };
    this._items$.next(items);
  }

  remove(index: number) {
    this._items$.next(this._items$.value.filter((_,i) => i !== index));
  }
}
