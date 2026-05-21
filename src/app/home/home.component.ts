import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product, Brand } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featured: Product[] = [];
  brands: Brand[] = [];
  heroImg: string = '';

  tickerItems = [
    '★ FW25 DROP 04 — LIVE NOW',
    '★ SABRINA 1 MAGNETIC',
    '★ FREE SHIPPING OVER 3,000฿',
    '★ KD 17 PENNY',
    '★ NEW ARRIVALS WEEKLY',
    '★ MB.03 TOXIC IN STOCK',
    '★ FW25 DROP 04 — LIVE NOW',
    '★ SABRINA 1 MAGNETIC',
    '★ FREE SHIPPING OVER 3,000฿',
    '★ KD 17 PENNY',
    '★ NEW ARRIVALS WEEKLY',
    '★ MB.03 TOXIC IN STOCK',
  ];

  stats = [
    { value: '500+', label: 'รุ่นรองเท้า' },
    { value: '06',   label: 'แบรนด์' },
    { value: '10K+', label: 'ลูกค้า' },
    { value: '24h',  label: 'จัดส่ง' },
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.featured = this.productService.getFeatured();
    this.brands = this.productService.brands;
    this.heroImg = this.productService.heroImg;
  }

  goToShop(): void { this.router.navigate(['/shop']); }

  goToDetail(id: string): void { this.router.navigate(['/detailpd', id]); }

  addToCart(product: Product): void {
    this.cartService.addItem(product, '9', 1);
  }

  toggleWishlist(product: Product): void {
    this.wishlistService.toggle(product);
  }

  isWishlisted(id: string): boolean {
    return this.wishlistService.isInWishlist(id);
  }

  getBadge(tags: string[]): string {
    if (tags.includes('Sale')) return 'SALE';
    if (tags.includes('New')) return 'NEW';
    if (tags.includes('Hot')) return 'HOT';
    return tags[0] || '';
  }

  formatPrice(p: number): string {
    return p.toLocaleString('th-TH') + '฿';
  }
}
