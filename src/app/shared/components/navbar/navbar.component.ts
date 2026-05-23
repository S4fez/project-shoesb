import { SearchService } from '../../../core/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MenuService, MenuItem } from '../../../core/services/menu.service';
import { UserRole, getRoleName } from '../../../core/models/role.model';
import { Component, AfterViewInit, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CartService } from '../../../core/services/cart.service';


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
