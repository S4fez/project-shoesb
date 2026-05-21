import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent {
  steps = [
    { id:1, label:'ORDER PLACED',           time:'Mon · 14 May · 10:32', done:true,  active:false },
    { id:2, label:'PAYMENT CONFIRMED',       time:'Mon · 14 May · 10:34', done:true,  active:false },
    { id:3, label:'PACKED · LEAVING WH',     time:'Tue · 15 May · 09:15', done:true,  active:false },
    { id:4, label:'OUT FOR DELIVERY',        time:'Wed · 16 May · 08:40', done:true,  active:true  },
    { id:5, label:'DELIVERED',               time:'Est. Wed · 16 May · 17:00', done:false, active:false },
  ];

  constructor(public svc: ProductService) {}

  stepLineColor(i: number): string {
    return this.steps[i + 1]?.done ? 'var(--court-orange)' : 'var(--court-line)';
  }
}
