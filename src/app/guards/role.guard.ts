import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserRole } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // ดึง roles ที่อนุญาตจาก route data
    const expectedRoles = route.data['roles'] as UserRole[];
    const userRole = this.authService.getUserRole();

    // ถ้าไม่มี role (ไม่ได้ login)
    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // ถ้าไม่มีการระบุ roles ใน route data ให้ผ่านได้เลย (แค่ login ก็พอ)
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    // เช็คว่า user มี role ที่อนุญาตหรือไม่
    if (!expectedRoles.includes(userRole)) {
      // ไม่มีสิทธิ์เข้าถึง -> redirect ไป home
      console.warn(`Access denied: User role ${userRole} not in allowed roles [${expectedRoles}]`);
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
