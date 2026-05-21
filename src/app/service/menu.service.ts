import { Injectable } from '@angular/core';
import { UserRole } from '../models/role.model';

export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  roles: UserRole[];
  available?: boolean;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuConfig: MenuItem[] = [
    // เมนูที่ทุก role เห็น
    {
      label: 'Home',
      route: '/home',
      icon: 'fa-home',
      roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN]
    },
    {
      label: 'Brand',
      icon: 'fa-store',
      roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN],
      children: [
        { label: 'Adidas', route: '/brand/adidas', roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN] },
        { label: 'Nike', route: '/brand/nike', roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN] },
        { label: 'Puma', route: '/brand/puma', roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN] },
        { label: 'Anta', route: '/brand/anta', roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN] },
        { label: 'Li-Ning', route: '/brand/li-ning', roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN] },
        { label: 'Converse', route: '/brand/converse', roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN] }
      ]
    },
    {
      label: 'Contact Us',
      route: '/contact',
      icon: 'fa-envelope',
      roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN]
    },

    // เมนู Staff & Admin
    {
      label: 'Orders Management',
      route: '/admin/orders',
      icon: 'fa-shopping-bag',
      roles: [UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN],
      available: false
    },
    {
      label: 'Inventory',
      route: '/admin/inventory',
      icon: 'fa-box',
      roles: [UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN],
      available: false
    },
    {
      label: 'Reports',
      route: '/admin/reports',
      icon: 'fa-chart-bar',
      roles: [UserRole.STAFF, UserRole.ADMIN, UserRole.SUPERADMIN],
      available: false
    },

    // เมนู SuperAdmin & Admin เท่านั้น
    {
      label: 'จัดการสินค้า',
      route: '/admin/products',
      icon: 'fa-tags',
      roles: [UserRole.SUPERADMIN, UserRole.ADMIN],
      available: true
    },
    {
      label: 'User Management',
      route: '/admin/users',
      icon: 'fa-users',
      roles: [UserRole.ADMIN, UserRole.SUPERADMIN],
      available: false
    }
  ];

  constructor() {}

  getMenuItems(userRole: UserRole): MenuItem[] {
    return this.menuConfig
      .filter(item => item.roles.includes(userRole) && item.available !== false)
      .map(item => {
        if (item.children) {
          return {
            ...item,
            children: item.children.filter(child => child.roles.includes(userRole) && child.available !== false)
          };
        }
        return item;
      });
  }

  getAllMenuItems(): MenuItem[] {
    return this.menuConfig;
  }
}
