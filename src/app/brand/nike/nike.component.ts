import { Component,OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Products,Shoes } from '../../product';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-nike',
  templateUrl: './nike.component.html',
  styleUrl: './nike.component.scss'
})
export class NikeComponent implements OnInit {

  public shoes :Shoes[] = [];
  public product?: Products;
  public products: Products[] = [];
  public brandid = 0
  public productid = '9'
  constructor(
    private accountService:AccountService ,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  this.brandid = 4
  }
  viewProductDetails():void {
    this.router.navigate(['/detail'],{ queryParams: { id:this.productid } });
  }


  ngOnInit(): void {

    this.accountService.getBrand(this.brandid).subscribe(
      (data: Shoes[]) =>{
      this.shoes = data;
      console.log('Brand detail:4 ',this.shoes)
    }) 
    this.accountService.getDetail(this.productid).subscribe(
      (data: Products) =>{
      this.product = data;
      console.log('Product Detail:',this.product);
    })
  }

  goToDetail(shoesId: number): void {
    this.router.navigate(['/detailpd', shoesId]);
  }

}

