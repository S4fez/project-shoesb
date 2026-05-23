import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Stock } from '../../core/models/stock.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cart: CartService, private router: Router) {}
  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
  goShop() { this.router.navigate(['/shop']); }
  checkout() { alert('Demo · proceed to payment'); }
}
