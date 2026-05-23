import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  priceMax = 8000;
  query = '';
  filtered: Product[] = [];
  all: Product[] = [];
  loading = true;

  brands = [['all','All'],['nike','Nike'],['adidas','Adidas'],['puma','Puma'],['converse','Converse'],['lining','Li-Ning'],['anta','Anta']];
  sorts  = [['new','NEW'],['price-asc','PRICE ↑'],['price-desc','PRICE ↓'],['rating','RATING']];
  colors = ['#000','#fff','#E84610','#DD2222','#1A5CFF','#19A300','#aaa'];

  constructor(
    public svc: ProductService,
    public wishlist: WishlistService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(qp => {
      this.query = qp.get('q') ?? '';
      const brand = qp.get('brand');
      if (brand && this.brands.some(b => b[0] === brand)) {
        this.brand = brand;
      }
      this.applyFilter();
    });
    this.svc.getProducts().subscribe(list => {
      this.all = list;
      this.loading = false;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filtered = this.svc.applyFilter(this.all, this.brand, this.priceMax, this.sortBy, this.query);
  }

  setSort(s: string) { this.sortBy = s; this.applyFilter(); }
  setBrand(b: string) { this.brand = b; this.applyFilter(); }
  setPriceMax(v: number) { this.priceMax = v; this.applyFilter(); }
  setSize(s: string) { this.size = s; }
  clearSearch() {
    this.query = '';
    this.router.navigate(['/shop']);
  }

  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
}
