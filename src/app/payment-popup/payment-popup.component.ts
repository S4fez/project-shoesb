import { Component, EventEmitter, Input, Output,OnChanges} from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Stock } from '../stock';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrl: './payment-popup.component.scss'
})
export class PaymentPopupComponent implements OnChanges{
  @Input() isVisible: boolean = false;
  @Input() data!: Stock[];
  @Input() Total!: number;
  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter();

  selectedPaymentMethod: string = 'card';
  discountedTotal: number = 0;
  promoCode: string = '';
  promoApplied: boolean = false;
  promoError: string = '';

  private validPromoCodes: { [key: string]: number } = {
    'SHOES10': 10,
    'BASKET20': 20,
    'WELCOME15': 15
  };

  constructor(
    private shoppingCartService: ShoppingCartService,
   ) {}

   ngOnChanges(): void {
    this.discountedTotal = this.Total;
    this.promoApplied = false;
    this.promoCode = '';
    this.promoError = '';
   }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  applyPromoCode() {
    const code = this.promoCode.trim().toUpperCase();
    if (this.validPromoCodes[code]) {
      const discount = this.validPromoCodes[code];
      this.discountedTotal = this.Total * (1 - discount / 100);
      this.promoApplied = true;
      this.promoError = '';
    } else {
      this.promoApplied = false;
      this.promoError = 'รหัสโปรโมชั่นไม่ถูกต้อง';
    }
  }

  closePopup() {
    this.popupClosed.emit(true); 

  }
  payment(){
    this.shoppingCartService.payment(this.data).subscribe({
      next:(response:any) =>{
        if(response.status === 'success'){
          localStorage.removeItem('SelectProduct');
            Swal.fire({
              title: 'Success!',
              text: 'Payment Success',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        } else  {
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',  
              confirmButtonText: 'Ok'
            });
        }
      },
      error:(err) => {
        if(err.status === 422){
            Swal.fire({
              title: 'Error!',
              text: 'Some items are out of stock!',
              icon: 'error',  
              confirmButtonText: 'Ok'
            });
        } else {
            Swal.fire({
              title: 'Error!',
              text: 'An unexpected error occurred!',
              icon: 'error', 
              confirmButtonText: 'Ok'
            });
        }
      }          
    });
  }

}
