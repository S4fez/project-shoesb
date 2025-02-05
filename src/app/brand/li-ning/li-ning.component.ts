import { Component,OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Products,Shoes } from '../../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-li-ning',
  templateUrl: './li-ning.component.html',
  styleUrl: './li-ning.component.scss'
})
export class LiNingComponent implements OnInit {
  public shoes :Shoes[] = [];
  public product?: Products;
  public products: Products[] = [];


  public brandid = 0
  constructor(private accountService:AccountService, private router: Router) {
  this.brandid = 3
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

