import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { MenuService, MenuItem } from '../../../core/services/menu.service';
import { UserRole, getRoleName } from '../../../core/models/role.model';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchQuery = '';
  menuOpen = false;
  cartOpen = false;
  suggestOpen = false;
  suggestions: Product[] = [];
  userMenuItems: MenuItem[] = [];
  userRole: UserRole | null = null;
  userName = '';

  private all: Product[] = [];
  private query$ = new Subject<string>();
  private sub = new Subscription();

  constructor(
    public router: Router,
    public cart: CartService,
    public wishlist: WishlistService,
    public auth: AuthService,
    private menuService: MenuService,
    private products: ProductService,
    private host: ElementRef,
  ) {}

  ngOnInit() {
    this.userRole = this.auth.getUserRole();
    this.userName = this.readUserName();
    if (this.userRole !== null) {
      this.userMenuItems = this.menuService.getMenuItems(this.userRole)
        .filter(item => item.route?.startsWith('/admin'));
    }

    this.sub.add(this.products.getProducts().subscribe(list => this.all = list));
    this.sub.add(
      this.query$.pipe(debounceTime(150), distinctUntilChanged())
        .subscribe(q => this.updateSuggestions(q))
    );
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  get roleLabel(): string {
    return this.userRole !== null ? getRoleName(this.userRole) : '';
  }

  isShopActive() {
    return this.router.url.startsWith('/shop') || this.router.url.startsWith('/detailpd');
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) this.cartOpen = false;
  }
  toggleCart() {
    this.cartOpen = !this.cartOpen;
    if (this.cartOpen) this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.host.nativeElement.contains(e.target)) {
      this.menuOpen = false;
      this.cartOpen = false;
      this.suggestOpen = false;
    }
  }

  onQueryChange(value: string) {
    this.searchQuery = value;
    this.query$.next(value);
  }

  onSearchFocus() {
    if (this.searchQuery.trim()) this.suggestOpen = true;
  }

  submitSearch() {
    const q = this.searchQuery.trim();
    this.suggestOpen = false;
    this.router.navigate(['/shop'], { queryParams: q ? { q } : {} });
  }

  pickSuggestion(p: Product) {
    this.suggestOpen = false;
    this.searchQuery = '';
    this.router.navigate(['/detailpd', p.id]);
  }

  goTo(route: string) {
    this.menuOpen = false;
    this.cartOpen = false;
    this.router.navigate([route]);
  }

  goCartPage() {
    this.cartOpen = false;
    this.router.navigate(['/cart']);
  }

  removeCartItem(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.cart.remove(index);
  }

  changeQty(index: number, delta: number, event: MouseEvent) {
    event.stopPropagation();
    this.cart.updateQty(index, delta);
  }

  logout() {
    this.menuOpen = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private updateSuggestions(raw: string) {
    const q = raw.trim().toLowerCase();
    if (!q) {
      this.suggestions = [];
      this.suggestOpen = false;
      return;
    }
    this.suggestions = this.all
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q)
      )
      .slice(0, 6);
    this.suggestOpen = this.suggestions.length > 0;
  }

  private readUserName(): string {
    try {
      const raw = localStorage.getItem('userProfile');
      if (!raw) return '';
      const u = JSON.parse(raw);
      return u.username || u.email || u.name || '';
    } catch {
      return '';
    }
  }
}
