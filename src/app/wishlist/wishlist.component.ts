import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../core/services/wishlist.service';
import { ProductService, Product } from '../core/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  private all: Product[] = [];
  loading = true;

  constructor(public wishlist: WishlistService, public svc: ProductService, private router: Router) {}

  ngOnInit() {
    this.svc.getProducts().subscribe(list => {
      this.all = list;
      this.loading = false;
    });
  }

  get items(): Product[] {
    return this.all.filter(p => this.wishlist.has(p.id));
  }

  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
  goShop() { this.router.navigate(['/shop']); }
}
