import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';

const PROMO_CODES: Record<string, { discount: number; minOrder: number; label: string }> = {
  SHOES10:   { discount: 10, minOrder: 0,    label: 'ลด 10% ทุกออเดอร์' },
  BASKET20:  { discount: 20, minOrder: 1500, label: 'ลด 20% รองเท้าบาส' },
  WELCOME15: { discount: 15, minOrder: 500,  label: 'ส่วนลดสมาชิกใหม่ 15%' },
  NIKE2025:  { discount: 12, minOrder: 2000, label: 'Nike Special 12%' },
};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  promoCode = '';
  appliedCode = '';
  discountPct = 0;
  promoError = '';

  constructor(public cart: CartService, private router: Router) {}

  goDetail(id: string) { this.router.navigate(['/detailpd', id]); }
  goShop() { this.router.navigate(['/shop']); }

  get discountAmount(): number {
    return Math.round(this.cart.subtotal * this.discountPct / 100);
  }
  get finalTotal(): number {
    return Math.max(0, this.cart.total - this.discountAmount);
  }

  applyPromo() {
    const code = this.promoCode.trim().toUpperCase();
    this.promoError = '';
    if (!code) { this.clearPromo(); return; }
    const promo = PROMO_CODES[code];
    if (!promo) {
      this.promoError = 'รหัสโปรโมชั่นไม่ถูกต้อง';
      this.appliedCode = '';
      this.discountPct = 0;
      return;
    }
    if (this.cart.subtotal < promo.minOrder) {
      this.promoError = `ต้องสั่งซื้อขั้นต่ำ ฿${promo.minOrder.toLocaleString()}`;
      this.appliedCode = '';
      this.discountPct = 0;
      return;
    }
    this.appliedCode = code;
    this.discountPct = promo.discount;
  }

  clearPromo() {
    this.promoCode = '';
    this.appliedCode = '';
    this.discountPct = 0;
    this.promoError = '';
  }

  checkout() {
    if (this.cart.items.length === 0) return;

    const itemsHtml = this.cart.items
      .map(i => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;font-size:13px;">
        <span style="text-align:left;">${i.name} <small style="color:#888;">×${i.qty} · ${i.size}</small></span>
        <span style="font-weight:600;">฿${(i.price * i.qty).toLocaleString()}</span>
      </div>`)
      .join('');

    const discountRow = this.appliedCode
      ? `<div style="display:flex;justify-content:space-between;font-size:13px;color:#19A300;">
          <span>ส่วนลด (${this.appliedCode})</span><span>-฿${this.discountAmount.toLocaleString()}</span>
        </div>`
      : '';

    Swal.fire({
      title: 'ยืนยันการสั่งซื้อ',
      html: `
        <div style="text-align:left;max-height:240px;overflow:auto;margin-bottom:12px;">${itemsHtml}</div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;">
          <span>ค่าจัดส่ง</span><span>${this.cart.shipping === 0 ? 'FREE' : '฿' + this.cart.shipping.toLocaleString()}</span>
        </div>
        ${discountRow}
        <div style="display:flex;justify-content:space-between;font-size:17px;font-weight:700;margin-top:8px;padding-top:8px;border-top:2px solid #000;">
          <span>TOTAL</span><span style="color:#FF5C1A;">฿${this.finalTotal.toLocaleString()}</span>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ชำระเงิน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#FF5C1A',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    }).then(result => {
      if (!result.isConfirmed) return;
      this.processPayment();
    });
  }

  private processPayment() {
    const total = this.finalTotal;
    const orderId = 'SB-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 89999);
    const snapshot = {
      orderId,
      placedAt: new Date().toISOString(),
      items: this.cart.items.map(i => ({
        id: i.id, name: i.name, brand: i.brand, model: i.model,
        img: i.img, price: i.price, qty: i.qty, size: i.size,
      })),
      subtotal: this.cart.subtotal,
      shipping: this.cart.shipping,
      promoCode: this.appliedCode || null,
      discount: this.discountAmount,
      total,
    };
    try { localStorage.setItem('lastOrder:v1', JSON.stringify(snapshot)); } catch {}
    this.cart.clear();
    this.clearPromo();
    Swal.fire({
      title: 'สั่งซื้อสำเร็จ!',
      text: `ชำระเงินจำนวน ฿${total.toLocaleString()} เรียบร้อยแล้ว`,
      icon: 'success',
      confirmButtonText: 'ดูสถานะคำสั่งซื้อ',
      confirmButtonColor: '#FF5C1A',
      showCancelButton: true,
      cancelButtonText: 'กลับหน้าแรก',
    }).then(r => {
      this.router.navigate([r.isConfirmed ? '/tracking' : '/home']);
    });
  }
}
