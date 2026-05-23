import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puma',
  template: '',
})
export class PumaComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/shop'], { queryParams: { brand: 'puma' }, replaceUrl: true });
  }
}
