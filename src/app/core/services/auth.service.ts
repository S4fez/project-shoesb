import { Injectable } from '@angular/core';
import { UserRole } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  getUserRole(): UserRole | null {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) return null;
    try {
      const user = JSON.parse(userProfile);
      return user.sys_role !== undefined ? user.sys_role : UserRole.CUSTOMER;
    } catch (error) {
      console.error('Error parsing user profile:', error);
      return null;
    }
  }

  hasRole(roles: UserRole[]): boolean {
    const userRole = this.getUserRole();
    return userRole !== null ? roles.includes(userRole) : false;
  }

  isSuperAdmin(): boolean {
    return this.getUserRole() === UserRole.SUPERADMIN;
  }

  isAdmin(): boolean {
    return this.getUserRole() === UserRole.ADMIN;
  }

  isStaff(): boolean {
    return this.getUserRole() === UserRole.STAFF;
  }

  isCustomer(): boolean {
    return this.getUserRole() === UserRole.CUSTOMER;
  }

  canManageProducts(): boolean {
    const role = this.getUserRole();
    return role === UserRole.SUPERADMIN || role === UserRole.ADMIN;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
  }
}
