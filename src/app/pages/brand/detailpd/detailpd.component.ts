import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-detailpd',
  templateUrl: './detailpd.component.html',
  styleUrls: ['./detailpd.component.scss']
})
export class DetailpdComponent implements OnInit {
  product: Product | undefined;
  selSize = '9.5';
  qty = 1;
  activeImg = 0;
  gallery: string[] = [];
  loading = true;

  specs = [
    ['Upper',   'Engineered Mesh + TPU Overlay'],
    ['Midsole', 'Full-length Zoom Air'],
    ['Outsole', 'Solid Rubber Herringbone'],
    ['Drop',    '10 mm'],
    ['Weight',  '385g (US 9)'],
    ['Made in', 'Vietnam'],
  ];

  features = [['◎','100% AUTHENTIC'],['→','FREE SHIPPING'],['↺','7-DAY RETURN']];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public svc: ProductService,
    public cart: CartService,
    public wishlist: WishlistService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.loading = true;
      this.svc.getProductById(p['id']).subscribe(found => {
        this.product = found ?? this.svc.products[0];
        this.gallery = [this.product.img, ...this.svc.extraImgs];
        this.activeImg = 0;
        this.loading = false;
      });
    });
  }

  addToCart() {
    if (this.product) {
      this.cart.add(this.product, this.selSize, this.qty);
      this.router.navigate(['/cart']);
    }
  }

  isAvailable(s: string) { return this.svc.availableSizes.includes(s); }
  incQty(d: number) { this.qty = Math.max(1, this.qty + d); }
}
