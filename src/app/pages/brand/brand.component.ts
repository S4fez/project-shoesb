import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Redirect /brand (without sub-brand) to shop
    if (this.route.firstChild === null) {
      this.router.navigate(['/shop'], { replaceUrl: true });
    }
  }
}
