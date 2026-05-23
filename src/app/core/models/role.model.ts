// Role mapping จาก database
// sys_role = 1 -> Admin
// sys_role = 2 -> Staff (เจ้าหน้าที่)
// sys_role = 3 -> Customer (ลูกค้า)

export enum UserRole {
  ADMIN = 1,
  STAFF = 2,
  CUSTOMER = 3
}

export interface User {
  userId: number;
  email: string;
  username?: string;
  sys_role: UserRole;  // มาจาก database
}

// Helper function สำหรับแปลง sys_role เป็นชื่อ
export function getRoleName(role: UserRole): string {
  switch (role) {
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
