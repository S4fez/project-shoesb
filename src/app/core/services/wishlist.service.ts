import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'wishlist:v1';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private _ids$ = new BehaviorSubject<string[]>(this.load());
  ids$ = this._ids$.asObservable();

  get ids()   { return this._ids$.value; }
  get count() { return this.ids.length; }

  has(id: string) { return this.ids.includes(id); }

  toggle(id: string) {
    const next = this.has(id) ? this.ids.filter(x => x !== id) : [...this.ids, id];
    this._ids$.next(next);
    this.persist(next);
  }

  clear() {
    this._ids$.next([]);
    this.persist([]);
  }

  private load(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }

  private persist(ids: string[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
  }
}
