import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nike',
  template: '',
})
export class NikeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/shop'], { queryParams: { brand: 'nike' }, replaceUrl: true });
  }
}
