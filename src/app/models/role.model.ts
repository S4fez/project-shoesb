// Role mapping จาก database
// sys_role = 0 -> SuperAdmin
// sys_role = 1 -> Admin
// sys_role = 2 -> Staff (เจ้าหน้าที่)
// sys_role = 3 -> Customer (ลูกค้า)

export enum UserRole {
  SUPERADMIN = 0,
  ADMIN = 1,
  STAFF = 2,
  CUSTOMER = 3
}

export interface User {
  userId: number;
  email: string;
  username?: string;
  sys_role: UserRole;
}

export function getRoleName(role: UserRole): string {
  switch (role) {
    case UserRole.SUPERADMIN:
      return 'SuperAdmin';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.STAFF:
      return 'Staff';
    case UserRole.CUSTOMER:
      return 'Customer';
    default:
      return 'Unknown';
  }
}
