import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Products,Shoes } from '../../product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adidas',
  templateUrl: './adidas.component.html',
  styleUrl: './adidas.component.scss'
})
export class AdidasComponent implements OnInit{
  public shoes :Shoes[] = [];
  public product?: Products;
  public products: Products[] = [];

  public brandid = 0
  constructor(private accountService:AccountService,private router: Router) {
    this.brandid = 1
  }
  ngOnInit(): void {
    this.accountService.getBrand(this.brandid).subscribe(
      (data: Shoes[]) =>{
      this.shoes = data;
      console.log('Brand detail:4 ',this.shoes)
    }) 

  }

  goToDetail(shoesId: number): void {
    this.router.navigate(['/detailpd', shoesId]);
  }

}
