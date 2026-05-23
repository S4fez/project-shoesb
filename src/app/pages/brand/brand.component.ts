import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { Products } from '../../core/models/product.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {
  product: Products[] =[];
  constructor(private accountService:AccountService) {

  }
  ngOnInit(): void {
    this.accountService.getDetail('12').subscribe((data: Products[]) =>{
      console.log(data)
    })
  }

}
