import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../core/services/product.service';
import { WishlistService } from '../core/services/wishlist.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  brand = 'all';
  sortBy = 'new';
  size = 'all';
  priceMax = 6000;
  filtered: Product[] = [];

  brands = [['all','All'],['nike','Nike'],['adidas','Adidas'],['puma','Puma'],['converse','Converse'],['lining','Li-Ning'],['anta','Anta']];
  sorts  = [['new','NEW'],['price-asc','PRICE ↑'],['price-desc','PRICE ↓'],['rating','RATING']];
  colors = ['#000','#fff','#E84610','#DD2222','#1A5CFF','#19A300','#aaa'];

  constructor(public svc: ProductService, public wishlist: WishlistService, private router: Router) {}

  ngOnInit() { this.applyFilter(); }

  applyFilter() {
    this.filtered = this.svc.filter(this.brand, this.priceMax, this.sortBy);
  }

  setSort(s: string) { this.sortBy = s; this.applyFilter(); }
  setBrand(b: string) { this.brand = b; this.applyFilter(); }
  setPriceMax(v: number) { this.priceMax = v; this.applyFilter(); }
  setSize(s: string) { this.size = s; }

  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
}
