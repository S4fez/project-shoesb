import { Component,OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Products,Shoes } from '../../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puma',
  templateUrl: './puma.component.html',
  styleUrl: './puma.component.scss'
})
export class PumaComponent implements OnInit {
  public shoes :Shoes[] = [];
  public product?: Products;
  public products: Products[] = [];


  public brandid = 0
  constructor(private accountService:AccountService, private router: Router) {
  this.brandid = 5
  }
  ngOnInit(): void {
    this.accountService.getBrand(this.brandid).subscribe(
      (data: Shoes[]) =>{
        console.log("dataconsole",data)
        for(var i=0;i<data.length;i++){
          console.log('length',data.length)
          if (data[i].product_id ==25)
            {
              data.splice(i,1)
              console.log("data.s",data)
            }
        }

      this.shoes = data;
      console.log('Brand detail:4 ',this.shoes)
    }) 

  }

  goToDetail(shoesId: number): void {
    this.router.navigate(['/detailpd', shoesId]);
  }

}
