import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  size = '';
  birthday = '';

  stats = [['ORDERS','12'],['POINTS','2,840'],['LEVEL','STARTER 5'],['SAVED','7']];
  navItems: [string, string, boolean?][] = [
    ['ACCOUNT',  '◉', true], ['ORDERS', '⊞'], ['WISHLIST', '♡'],
    ['ADDRESSES', '⌂'], ['PAYMENT', '◐'], ['SETTINGS', '⚙'],
  ];
  orders = [
    { no:'SB-2025-04217', qty:'2 items', total:'฿9,580',  status:'OUT FOR DELIVERY', color:'var(--court-orange)' },
    { no:'SB-2025-04102', qty:'1 item',  total:'฿4,290',  status:'DELIVERED',        color:'var(--court-mute)' },
    { no:'SB-2025-03889', qty:'3 items', total:'฿11,290', status:'DELIVERED',        color:'var(--court-mute)' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const p = JSON.parse(profile);
      this.email = p.email || '';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  saveChanges() { alert('Demo: changes saved'); }
  goTracking() { this.router.navigate(['/tracking']); }
}
