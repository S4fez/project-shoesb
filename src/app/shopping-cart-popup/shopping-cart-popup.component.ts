import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../service/shopping-cart.service'; // Make sure to import your service
import { Shoes } from '../product';
import { AccountService } from '../service/account.service';
import { Stock } from '../stock';
import { Router } from '@angular/router';
import { CartService } from '../service/checkout.service';

@Component({
  selector: 'app-shopping-cart-popup',
  templateUrl: './shopping-cart-popup.component.html',
  styleUrls: ['./shopping-cart-popup.component.scss']
})
export class ShoppingCartPopupComponent implements OnInit {
  isCartVisible = false;
  selectedProduct: any = {};
  selectedSize: any = {};

  public shoes :Shoes[] = [];
  public stock :Stock[] = [];
  public brandid = 0
  public productid! : number;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService:AccountService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
   ) {}

  ngOnInit() {
    this.productid = +this.route.snapshot.paramMap.get('id')!;
    console.log('Product ID: ',this.productid);

    // Subscribe to the service for cart visibility
    this.shoppingCartService.cartVisible$.subscribe(visible => {
    this.isCartVisible = visible;
    });

    // ***กรองไซส์ของสินค้า***
    this.shoppingCartService.getStock(this.productid).subscribe(
      (data: Stock[]) =>{
        console.log("dataconsole",data)


        for(var i=0;i<data.length;i++){
          console.log('length',data.length)

          if (data[i].stock_size == 0)
            {
              data.splice(i,1)
              console.log("data.s",data)
            }
        }

      this.stock = data;
      console.log('Stock detail: ',this.stock)

      this.selectedProduct = {
        sizes: this.stock.map(stock => stock.size),
      };
    }) 


    this.accountService.getShoeById(this.productid).subscribe(
      (data: Shoes[]) => {
        this.shoes = data;
        console.log(this.shoes)
    })

    this.route.queryParams.subscribe(params => {
      this.productid = +params['id'] || 0;
      console.log('Product ID: ',this.productid);
    })
  }

  closeCart() {
    this.shoppingCartService.closeCart(); // Call the service method to update visibility
  }

  // Method to add product to cart
  addToCart() {


    if (this.selectedSize) {

      let arraySelectsize : any[] = [];
      if(localStorage.getItem('SelectProduct') === null){
        arraySelectsize.push(this.selectedSize);
        localStorage.setItem('SelectProduct',JSON.stringify(arraySelectsize));
        console.log("localStorage.getItem('SelectProduct') 22221",localStorage.getItem('SelectProduct'))        
      }
      else {
        let storeArray = localStorage.getItem('SelectProduct');
        arraySelectsize = storeArray ? JSON.parse(storeArray) : [];
        arraySelectsize.push(this.selectedSize);
        localStorage.setItem('SelectProduct',JSON.stringify(arraySelectsize));
        console.log("arraySelectsize 2",arraySelectsize);
        console.log("localStorage.getItem('SelectProduct') 22222",localStorage.getItem('SelectProduct'))
      }

      this.closeCart(); // Optionally close the cart after adding
    } else {
      alert('Please select a size.');
    }
  }

  goToCheckout() {
    const cartItems = this.cartService.getCartItems();
    this.router.navigate(['/checkout'], { state: { cartItems } });
  }

  selectSize(sizeId: number): void {
    this.selectedSize = sizeId; // Updates the selected size
  }
}
