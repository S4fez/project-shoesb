import { Component, OnInit } from '@angular/core';

interface Promotion {
  id: number;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: 'percent' | 'fixed';
  minOrder: number;
  expiryDate: Date;
  brand?: string;
  isActive: boolean;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit {
  promotions: Promotion[] = [
    {
      id: 1,
      code: 'SHOES10',
      title: 'ลด 10% ทุกออเดอร์',
      description: 'รับส่วนลด 10% สำหรับการสั่งซื้อทุกรายการ ไม่จำกัดแบรนด์',
      discount: 10,
      type: 'percent',
      minOrder: 0,
      expiryDate: new Date('2025-12-31'),
      isActive: true,
      icon: 'fa-tag',
      color: '#667eea'
    },
    {
      id: 2,
      code: 'BASKET20',
      title: 'ลด 20% รองเท้าบาส',
      description: 'ส่วนลดพิเศษ 20% สำหรับรองเท้าบาสเกตบอลทุกรุ่น',
      discount: 20,
      type: 'percent',
      minOrder: 1500,
      expiryDate: new Date('2025-08-31'),
      isActive: true,
      icon: 'fa-basketball-ball',
      color: '#f5576c'
    },
    {
      id: 3,
      code: 'WELCOME15',
      title: 'ยินดีต้อนรับสมาชิกใหม่',
      description: 'สำหรับสมาชิกใหม่ รับส่วนลด 15% สำหรับการสั่งซื้อครั้งแรก',
      discount: 15,
      type: 'percent',
      minOrder: 500,
      expiryDate: new Date('2025-12-31'),
      isActive: true,
      icon: 'fa-gift',
      color: '#11998e'
    },
    {
      id: 4,
      code: 'NIKE2025',
      title: 'Nike Special',
      description: 'ส่วนลดพิเศษสำหรับรองเท้า Nike ทุกรุ่น',
      discount: 12,
      type: 'percent',
      minOrder: 2000,
      expiryDate: new Date('2025-07-31'),
      brand: 'Nike',
      isActive: true,
      icon: 'fa-running',
      color: '#fc4a1a'
    },
    {
      id: 5,
      code: 'ADIDAS25',
      title: 'Adidas Summer Sale',
      description: 'ลดราคาพิเศษรองเท้า Adidas ฤดูร้อนนี้',
      discount: 25,
      type: 'percent',
      minOrder: 2500,
      expiryDate: new Date('2025-06-30'),
      brand: 'Adidas',
      isActive: false,
      icon: 'fa-star',
      color: '#764ba2'
    }
  ];

  copiedCode: string | null = null;

  get activePromotions(): Promotion[] {
    return this.promotions.filter(p => p.isActive);
  }

  get expiredPromotions(): Promotion[] {
    return this.promotions.filter(p => !p.isActive);
  }

  getDaysLeft(expiryDate: Date): number {
    const today = new Date();
    const diff = expiryDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  isExpiringSoon(expiryDate: Date): boolean {
    return this.getDaysLeft(expiryDate) <= 7;
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedCode = code;
      setTimeout(() => this.copiedCode = null, 2000);
    });
  }

  ngOnInit(): void {}
}
