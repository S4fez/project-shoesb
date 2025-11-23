import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MenuService, MenuItem } from '../service/menu.service';
import { UserRole, getRoleName } from '../models/role.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  SearchService: any;
  searchResults: any[] = [];
  Onshow = false;

  // Properties สำหรับ role-based menu
  menuItems: MenuItem[] = [];
  userRole: UserRole | null = null;
  roleName: string = '';

  constructor(
    private elementRef: ElementRef,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    // ดึง role ของ user
    this.userRole = this.authService.getUserRole();

    // ถ้ามี role ให้ดึง menu items ที่เหมาะสม
    if (this.userRole) {
      this.menuItems = this.menuService.getMenuItems(this.userRole);
      this.roleName = getRoleName(this.userRole);
    }
  }

  ngAfterViewInit() {
    // โค้ดอื่น ๆ ที่คุณมี
  }

  search(event: Event) {
    event.preventDefault(); // ป้องกัน form submit/refresh หน้า

    const inputElement = this.elementRef.nativeElement.querySelector('#search-item') as HTMLInputElement;
    const name = inputElement.value.trim();

    if (!name){
      this.Onshow = false;
      return;
    } 

    // console.log('Search query:', name);

    this.searchService.getSearch(name).subscribe((data) => {
      // console.log('Search results:', data);
      this.searchResults = data; // แสดงผลลัพธ์ใต้ช่องค้นหา
      this.Onshow = true;
    });
  }
  goToDetail(shoesId: number): void {
    // บังคับ navigate ใหม่แม้เป็น URL เดิม
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/detailpd', shoesId]);
    });
  }

  // Helper methods สำหรับเช็ค role ใน template
  isCustomer(): boolean {
    return this.authService.isCustomer();
  }

  isStaff(): boolean {
    return this.authService.isStaff();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
