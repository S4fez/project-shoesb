import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchQuery = '';
  constructor(public router: Router, public cart: CartService, public wishlist: WishlistService) {}
  isShopActive() { return this.router.url.startsWith('/shop') || this.router.url.startsWith('/detailpd'); }
}
