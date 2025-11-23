import { Injectable } from '@angular/core';
import { UserRole } from '../models/role.model';

export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  roles: UserRole[];  // role ไหนบ้างที่เห็นเมนูนี้
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
      roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
    },
    {
      label: 'Brand',
      icon: 'fa-store',
      roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN],
      children: [
        {
          label: 'Adidas',
          route: '/brand/adidas',
          roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
        },
        {
          label: 'Nike',
          route: '/brand/nike',
          roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
        },
        {
          label: 'Puma',
          route: '/brand/puma',
          roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
        },
        {
          label: 'Anta',
          route: '/brand/anta',
          roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
        },
        {
          label: 'Li-Ning',
          route: '/brand/li-ning',
          roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
        },
        {
          label: 'Converse',
          route: '/brand/converse',
          roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
        }
      ]
    },
    {
      label: 'Contact Us',
      route: '/contact',
      icon: 'fa-envelope',
      roles: [UserRole.CUSTOMER, UserRole.STAFF, UserRole.ADMIN]
    },

    // เมนูสำหรับ Staff และ Admin
    {
      label: 'Orders Management',
      route: '/admin/orders',
      icon: 'fa-shopping-bag',
      roles: [UserRole.STAFF, UserRole.ADMIN]
    },
    {
      label: 'Inventory',
      route: '/admin/inventory',
      icon: 'fa-box',
      roles: [UserRole.STAFF, UserRole.ADMIN]
    },
    {
      label: 'Reports',
      route: '/admin/reports',
      icon: 'fa-chart-bar',
      roles: [UserRole.STAFF, UserRole.ADMIN]
    },

    // เมนูสำหรับ Admin เท่านั้น
    {
      label: 'Product Management',
      route: '/admin/products',
      icon: 'fa-tags',
      roles: [UserRole.ADMIN]
    },
    {
      label: 'User Management',
      route: '/admin/users',
      icon: 'fa-users',
      roles: [UserRole.ADMIN]
    }
  ];

  constructor() {}

  // ดึงเมนูตาม role ของ user
  getMenuItems(userRole: UserRole): MenuItem[] {
    return this.menuConfig
      .filter(item => item.roles.includes(userRole))
      .map(item => {
        // ถ้ามี children ให้ filter children ตาม role ด้วย
        if (item.children) {
          return {
            ...item,
            children: item.children.filter(child => child.roles.includes(userRole))
          };
        }
        return item;
      });
  }

  // ดึงเมนูทั้งหมด (สำหรับ debug)
  getAllMenuItems(): MenuItem[] {
    return this.menuConfig;
  }
}
