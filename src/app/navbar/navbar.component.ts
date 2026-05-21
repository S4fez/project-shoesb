import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { CartService } from '../service/cart.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentRoute = '';
  cartCount = 0;
  wishlistCount = 0;
  searchQuery = '';
  private subs: Subscription[] = [];

  navItems = [
    { label: 'หน้าแรก', route: '/home' },
    { label: 'Shop',     route: '/shop' },
    { label: 'Wishlist', route: '/wishlist' },
    { label: 'Tracking', route: '/tracking' },
  ];

  constructor(
    private router: Router,
    public authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.subs.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: any) => { this.currentRoute = e.urlAfterRedirects; })
    );
    this.subs.push(this.cartService.count$.subscribe(c => this.cartCount = c));
    this.subs.push(this.wishlistService.count$.subscribe(c => this.wishlistCount = c));
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  isActive(route: string): boolean { return this.currentRoute === route || this.currentRoute.startsWith(route + '/'); }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/shop'], { queryParams: { q: this.searchQuery } });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean { return this.authService.isAuthenticated(); }
}
