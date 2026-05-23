import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-li-ning',
  template: '',
})
export class LiNingComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/shop'], { queryParams: { brand: 'lining' }, replaceUrl: true });
  }
}
