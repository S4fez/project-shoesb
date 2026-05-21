import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product, Brand } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  allProducts: Product[] = [];
  filtered: Product[] = [];
  brands: Brand[] = [];
  sizes: string[] = [];

  // Filters
  selectedBrand = 'all';
  selectedSize = '';
  minPrice = 0;
  maxPrice = 10000;
  selectedSort = 'featured';

  sortOptions = [
    { value: 'featured', label: 'FEATURED' },
    { value: 'price-asc', label: 'PRICE ↓' },
    { value: 'price-desc', label: 'PRICE ↑' },
    { value: 'rating', label: 'TOP RATED' },
    { value: 'newest', label: 'NEWEST' },
  ];

  colors = [
    { name: 'Black',  hex: '#111111' },
    { name: 'White',  hex: '#EEEEEE' },
    { name: 'Red',    hex: '#E84610' },
    { name: 'Blue',   hex: '#2563EB' },
    { name: 'Yellow', hex: '#F2B100' },
    { name: 'Green',  hex: '#16A34A' },
  ];
  selectedColor = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getAll();
    this.brands = this.productService.brands;
    this.sizes = this.productService.sizes;
    this.applyFilters();
  }

  applyFilters(): void {
    let products = [...this.allProducts];
    if (this.selectedBrand !== 'all') {
      products = products.filter(p => p.brand.toLowerCase() === this.selectedBrand);
    }
    if (this.selectedSize) {
      products = products.filter(p => p.stock > 0);
    }
    products = products.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);

    switch (this.selectedSort) {
      case 'price-asc':  products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'rating':     products.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    this.filtered = products;
  }

  selectBrand(id: string): void {
    this.selectedBrand = id;
    this.applyFilters();
  }

  selectSize(s: string): void {
    this.selectedSize = this.selectedSize === s ? '' : s;
    this.applyFilters();
  }

  setSort(val: string): void {
    this.selectedSort = val;
    this.applyFilters();
  }

  goToDetail(id: string): void { this.router.navigate(['/detailpd', id]); }

  toggleWishlist(product: Product): void { this.wishlistService.toggle(product); }

  isWishlisted(id: string): boolean { return this.wishlistService.isInWishlist(id); }

  getBadge(tags: string[]): string {
    if (tags.includes('Sale')) return 'SALE';
    if (tags.includes('New')) return 'NEW';
    if (tags.includes('Hot')) return 'HOT';
    return tags[0] || '';
  }

  formatPrice(p: number): string { return p.toLocaleString('th-TH') + '฿'; }
}
