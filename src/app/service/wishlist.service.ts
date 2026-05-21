import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private _ids$ = new BehaviorSubject<string[]>([]);
  ids$ = this._ids$.asObservable();

  get ids()   { return this._ids$.value; }
  get count() { return this.ids.length; }

  has(id: string) { return this.ids.includes(id); }
  toggle(id: string) {
    this._ids$.next(this.has(id) ? this.ids.filter(x => x !== id) : [...this.ids, id]);
  }
}
