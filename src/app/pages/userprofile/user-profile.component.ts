import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { getRoleName } from '../../core/models/role.model';

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

  userName = '';
  avatarInitials = '';
  roleLabel = '';

  navItems: [string, string, boolean?][] = [
    ['ACCOUNT',  '◉', true],
    ['WISHLIST', '♡'],
    ['CART',     '⊞'],
    ['TRACKING', '→'],
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    public cart: CartService,
    public wishlist: WishlistService,
  ) {}

  ngOnInit() {
    const role = this.auth.getUserRole();
    this.roleLabel = role !== null ? getRoleName(role).toUpperCase() : 'GUEST';

    const raw = localStorage.getItem('userProfile');
    if (raw) {
      try {
        const p = JSON.parse(raw);
        this.email = p.email || '';
        this.userName = p.username || p.name || (this.email.split('@')[0] || '');
        this.firstName = p.firstName || p.first_name || '';
        this.lastName = p.lastName || p.last_name || '';
        this.phone = p.phone || p.tel || '';
        this.size = p.size || '';
        this.birthday = p.birthday || '';
      } catch {}
    }

    this.avatarInitials = this.computeInitials(this.userName || this.email);
  }

  get stats(): [string, string | number][] {
    return [
      ['WISHLIST', this.wishlist.count],
      ['CART',     this.cart.count],
      ['ROLE',     this.roleLabel],
      ['STATUS',   this.auth.isAuthenticated() ? 'ACTIVE' : '—'],
    ];
  }

  get displayName(): string {
    const full = [this.firstName, this.lastName].filter(Boolean).join(' ').trim();
    return (full || this.userName || 'USER').toUpperCase();
  }

  navClick(label: string) {
    switch (label) {
      case 'WISHLIST': this.router.navigate(['/wishlist']); break;
      case 'CART':     this.router.navigate(['/cart']);     break;
      case 'TRACKING': this.router.navigate(['/tracking']); break;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  saveChanges() {
    const raw = localStorage.getItem('userProfile');
    try {
      const p = raw ? JSON.parse(raw) : {};
      const next = {
        ...p,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        size: this.size,
        birthday: this.birthday,
      };
      localStorage.setItem('userProfile', JSON.stringify(next));
      Swal.fire({ title: 'บันทึกแล้ว', icon: 'success', timer: 1400, showConfirmButton: false });
    } catch {
      Swal.fire({ title: 'บันทึกไม่สำเร็จ', icon: 'error' });
    }
  }

  goTracking() { this.router.navigate(['/tracking']); }

  private computeInitials(src: string): string {
    if (!src) return 'SB';
    const cleaned = src.split('@')[0].replace(/[^A-Za-z฀-๿\s]/g, ' ').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return cleaned.slice(0, 2).toUpperCase() || 'SB';
  }
}
