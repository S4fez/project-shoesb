import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../core/services/product.service';

interface OrderItem {
  id: string; name: string; brand: string; model: string;
  img: string; price: number; qty: number; size: string;
}
interface OrderSnapshot {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  order: OrderSnapshot | null = null;
  steps: { id: number; label: string; time: string; done: boolean; active: boolean }[] = [];

  constructor(public svc: ProductService, private router: Router) {}

  ngOnInit() {
    const raw = localStorage.getItem('lastOrder:v1');
    if (raw) {
      try { this.order = JSON.parse(raw); } catch { this.order = null; }
    }
    this.steps = this.buildSteps(this.order?.placedAt);
  }

  get itemCount(): number {
    return this.order?.items.reduce((s, i) => s + i.qty, 0) ?? 0;
  }

  get estArrivalDate(): string {
    if (!this.order) return '';
    const d = new Date(this.order.placedAt);
    d.setDate(d.getDate() + 2);
    return d.toLocaleDateString('th-TH', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  }

  get estArrivalTime(): string {
    return '17:00';
  }

  goShop() { this.router.navigate(['/shop']); }

  stepLineColor(i: number): string {
    return this.steps[i + 1]?.done ? 'var(--court-orange)' : 'var(--court-line)';
  }

  private buildSteps(placedAtIso?: string) {
    if (!placedAtIso) {
      return [
        { id: 1, label: 'ORDER PLACED',       time: '—', done: false, active: false },
        { id: 2, label: 'PAYMENT CONFIRMED',  time: '—', done: false, active: false },
        { id: 3, label: 'PACKED · LEAVING WH',time: '—', done: false, active: false },
        { id: 4, label: 'OUT FOR DELIVERY',   time: '—', done: false, active: false },
        { id: 5, label: 'DELIVERED',          time: '—', done: false, active: false },
      ];
    }
    const placed = new Date(placedAtIso);
    const now = new Date();
    const elapsedH = (now.getTime() - placed.getTime()) / 3_600_000;
    const fmt = (offsetH: number) => {
      const d = new Date(placed.getTime() + offsetH * 3_600_000);
      return d.toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase();
    };
    const stages = [
      { id: 1, label: 'ORDER PLACED',        offsetH: 0 },
      { id: 2, label: 'PAYMENT CONFIRMED',    offsetH: 0.1 },
      { id: 3, label: 'PACKED · LEAVING WH',  offsetH: 4 },
      { id: 4, label: 'OUT FOR DELIVERY',     offsetH: 24 },
      { id: 5, label: 'DELIVERED',            offsetH: 48 },
    ];
    return stages.map((s, idx, arr) => {
      const done = elapsedH >= s.offsetH;
      const nextOffset = arr[idx + 1]?.offsetH ?? Infinity;
      const active = done && elapsedH < nextOffset;
      return {
        id: s.id,
        label: s.label,
        time: done ? fmt(s.offsetH) : (idx === arr.length - 1 ? 'EST. ' + fmt(s.offsetH) : '—'),
        done,
        active,
      };
    });
  }
}
