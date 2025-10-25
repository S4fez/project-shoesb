import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { SearchService } from '../service/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  SearchService: any;
  searchResults: any[] = [];
  Onshow = false;
  constructor(private elementRef: ElementRef, private searchService: SearchService, private route: ActivatedRoute, private router: Router,) { }

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

}
