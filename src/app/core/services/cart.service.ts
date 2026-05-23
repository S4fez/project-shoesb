import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem extends Product { qty: number; size: string; }

const STORAGE_KEY = 'cart:v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items$ = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this._items$.asObservable();

  get items()    { return this._items$.value; }
  get count()    { return this.items.reduce((s, i) => s + i.qty, 0); }
  get subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  get shipping() { return this.subtotal === 0 ? 0 : (this.subtotal > 2000 ? 0 : 80); }
  get total()    { return this.subtotal + this.shipping; }

  add(product: Product, size: string, qty: number) {
    const cur = this._items$.value;
    const idx = cur.findIndex(i => i.id === product.id && i.size === size);
    let next: CartItem[];
    if (idx >= 0) {
      next = [...cur];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
    } else {
      next = [...cur, { ...product, size, qty }];
    }
    this._items$.next(next);
    this.persist(next);
  }

  updateQty(index: number, delta: number) {
    const items = [...this._items$.value];
    const nq = items[index].qty + delta;
    if (nq < 1) return;
    items[index] = { ...items[index], qty: nq };
    this._items$.next(items);
    this.persist(items);
  }

  remove(index: number) {
    const next = this._items$.value.filter((_, i) => i !== index);
    this._items$.next(next);
    this.persist(next);
  }

  clear() {
    this._items$.next([]);
    this.persist([]);
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }
}
