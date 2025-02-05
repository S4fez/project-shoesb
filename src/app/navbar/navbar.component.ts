import { Component,AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // โค้ดอื่น ๆ ที่คุณมี
  }

  search() {
    const searchbox = this.elementRef.nativeElement.querySelector("#search-item").value.toUpperCase();
    const storeitems = this.elementRef.nativeElement.querySelector("#item-product");
    const product = this.elementRef.nativeElement.querySelectorAll(".product-box");
    const pname = storeitems.getElementsByTagName("product-title");

    for (let i = 0; i < pname.length; i++) {
      let match = product[i].querySelector('product-title');

      if (match) {
        let textvalue = match.textContent || match.innerHTML;

        if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
          product[i].style.display = "";
        } else {
          product[i].style.display = "none";
        }
      }
    }
  }
}
