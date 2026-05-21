import { Component, AfterViewInit, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../service/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MenuService, MenuItem } from '../service/menu.service';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { UserRole, getRoleName } from '../models/role.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  SearchService: any;
  searchResults: any[] = [];
  Onshow = false;

  menuItems: MenuItem[] = [];
  userRole: UserRole | null = null;
  roleName: string = '';
  cartCount: number = 0;

  private cartSub!: Subscription;
  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    if (this.userRole) {
      this.menuItems = this.menuService.getMenuItems(this.userRole);
      this.roleName = getRoleName(this.userRole);
    }

    this.cartSub = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.searchSub = this.searchSubject.pipe(
      debounceTime(350),
      distinctUntilChanged()
    ).subscribe(query => {
      if (!query) { this.Onshow = false; return; }
      this.searchService.getSearch(query).subscribe((data) => {
        this.searchResults = data;
        this.Onshow = true;
      });
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

  ngAfterViewInit() { }

  search(event: Event) {
    event.preventDefault();
    const inputElement = this.elementRef.nativeElement.querySelector('#search-item') as HTMLInputElement;
    const name = inputElement.value.trim();
    this.searchSubject.next(name);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
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
