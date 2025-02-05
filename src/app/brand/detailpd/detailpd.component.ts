import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products,Shoes } from '../../product'
import { AccountService } from '../../service/account.service';
import { ShoppingCartService } from '../../service/shopping-cart.service';


@Component({
  selector: 'app-detailpd',
  templateUrl: './detailpd.component.html',
  styleUrls: ['./detailpd.component.scss']
})
export class DetailpdComponent implements OnInit {

  public shoes :Shoes[] = [];
  public product?: Products;
  public products: Products[] = [];
  public brandid = 0
  public productid! : number;


  constructor(
    private accountService:AccountService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
   ) { }

  ngOnInit():void {
    this.productid = +this.route.snapshot.paramMap.get('id')!;
    console.log('Product ID: ',this.productid);
    // console.log('brand ID: ',this.brandid);
    this.accountService.getShoeById(this.productid).subscribe(
      (data: Shoes[]) => {
        this.shoes = data;
        console.log(this.shoes)
    })

    this.route.queryParams.subscribe(params => {
      this.productid = +params['id'] || 0;
      console.log('Product ID: ',this.productid);
    })

    this.accountService.getDetail(this.productid.toString()).subscribe(
      (data: Products) =>{
      this.product = data;
      console.log('Product Detail:',this.product);
    })

  }
  shoppingCart(){
    this.shoppingCartService.openCart();
  }


}
