import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product, Brand } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featured: Product[] = [];
  brands: Brand[] = [];
  loading = true;
  ticker = ['FREE SHIPPING OVER ฿2,000','NEW DROP — SABRINA 1','BIRTHDAY BONUS 10% OFF','100% AUTHENTIC','NEXT DAY DELIVERY BKK'];
  get tickerItems() { return [...this.ticker,...this.ticker,...this.ticker]; }
  stats = [['500+','รุ่นรองเท้า'],['06','แบรนด์'],['10K+','ลูกค้า'],['24h','จัดส่ง']];

  constructor(public svc: ProductService, private router: Router) {}

  ngOnInit() {
    this.svc.getProducts().subscribe(list => {
      this.featured = list.slice(0, 4);
      this.loading = false;
    });
    this.svc.getBrandsFromApi().subscribe(list => {
      this.brands = list;
    });
  }

  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
  goShop() { this.router.navigate(['/shop']); }
}
