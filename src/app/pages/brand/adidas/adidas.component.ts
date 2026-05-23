import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adidas',
  template: '',
})
export class AdidasComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/shop'], { queryParams: { brand: 'adidas' }, replaceUrl: true });
  }
}
