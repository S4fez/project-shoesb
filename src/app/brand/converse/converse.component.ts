import { Component,OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Products,Shoes } from '../../product';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-converse',
  templateUrl: './converse.component.html',
  styleUrl: './converse.component.scss'
})
export class ConverseComponent implements OnInit {
  public shoes :Shoes[] = [];
  public product?: Products;
  public products: Products[] = [];

  public brandid = 0
  // public productsizeid = '910'
  public productid = '9'
  constructor(private accountService:AccountService,private router: Router) {
  this.brandid = 6
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
