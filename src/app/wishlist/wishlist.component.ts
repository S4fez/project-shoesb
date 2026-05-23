import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../core/services/wishlist.service';
import { ProductService, Product } from '../core/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  constructor(public wishlist: WishlistService, public svc: ProductService, private router: Router) {}

  get items(): Product[] {
    return this.svc.products.filter(p => this.wishlist.has(p.id));
  }

  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
  goShop() { this.router.navigate(['/shop']); }
}
