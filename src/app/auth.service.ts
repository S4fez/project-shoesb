import { Injectable } from '@angular/core';
import { UserRole } from './models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  // ดึง sys_role จาก localStorage
  getUserRole(): UserRole | null {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) return null;

    try {
      const user = JSON.parse(userProfile);
      return user.sys_role || UserRole.CUSTOMER; // default เป็น customer
    } catch (error) {
      console.error('Error parsing user profile:', error);
      return null;
    }
  }

  // เช็คว่ามี role ที่ระบุหรือไม่
  hasRole(roles: UserRole[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

  // เช็คว่าเป็น Admin หรือไม่
  isAdmin(): boolean {
    return this.getUserRole() === UserRole.ADMIN;
  }

  // เช็คว่าเป็น Staff หรือไม่
  isStaff(): boolean {
    return this.getUserRole() === UserRole.STAFF;
  }

  // เช็คว่าเป็น Customer หรือไม่
  isCustomer(): boolean {
    return this.getUserRole() === UserRole.CUSTOMER;
  }

  // Logout - ลบทุกอย่างออกจาก localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
  }
}