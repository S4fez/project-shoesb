import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Stock } from '../stock';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit{

  sizeID: string | null = null;
  public productid! : number;
  public stock :Stock[] = [];
  total = 0 
  itemsArray: {
    index: number;
    quantity: number;
    stocks:number;
  }[]=[];
  localStorageArray:number[]=[];
  combinedStocks:Stock[] = []
  
  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // ดึงข้อมูลจาก localStorage
    this.sizeID = localStorage.getItem('SelectProduct');
    console.log('localstorage',this.sizeID)

    if(this.sizeID){
      this.localStorageArray = JSON.parse(this.sizeID)
      this.shoppingCartService.postSizeID(this.sizeID).subscribe(
        (data: Stock[]) =>{
          this.stock = data;
        console.log('Size Detail cart:',this.stock[0].stock_size);
        this.itemsArray = this.stock.map((_, index) => ({
          index: index, 
          quantity: 1,   
          stocks: _.stock_size,
        }));
        
        let filteredItems = this.stock.filter(item => item.stock_size === 0);
        for (let i = 0;i < filteredItems.length ; i++) {
          console.log('filteredItems[i].productsize_id',filteredItems[i].productsize_id)                        
          let index = this.localStorageArray as number[];  
          let itemIndex = index.findIndex(item => item === filteredItems[i].productsize_id);  
          if (itemIndex !== -1) {
            this.localStorageArray.splice(itemIndex, 1);
          }            
          console.log('arraysizeId',this.localStorageArray)
          
        }
        localStorage.setItem('SelectProduct',JSON.stringify(this.localStorageArray));
        
        this.combinedStocks = this.stock
          .filter(stock => stock.stock_size > 0) // กรองเฉพาะ stock ที่ stocksize มากกว่า 0
          .map((stock, index) => ({
            ...stock,
            quantity: this.itemsArray[index].quantity, // แปลงข้อมูล
          }));

        this.calTotal(this.combinedStocks); //Total price
        console.log('this.comBine',this.combinedStocks)
        console.log('filteredItems',filteredItems)
        console.log('iteM',this.itemsArray)
      })
    }

  }
    // ตัวอย่างสินค้าในตะกร้า
    
  
    increaseQuantity(i:number) {
      const maxStock = this.combinedStocks[i].stock_size;
      if(this.combinedStocks[i].quantity < maxStock){
        this.combinedStocks[i].quantity++;
        this.calTotal(this.combinedStocks); 
      }
      else {
        alert('สินค้าคงเหลือไม่พอ');
      }

    }
  
    decreaseQuantity(i:number) {
      if (this.combinedStocks[i].quantity > 1) {
        this.combinedStocks[i].quantity--;
        this.calTotal(this.combinedStocks); 
      }
    }

    bin(index:number) {
      console.log('this.stock[index].productsize_id',this.stock[index].productsize_id)
      if(this.sizeID){
      // let arraysizeId = JSON.parse(this.sizeID)
      let itemray = this.localStorageArray as number[]; 
      let indexRemove = itemray.findIndex(item => item === this.stock[index].productsize_id);
      // let indexRemove = index.indexOf(i);
      
      console.log('index',index)
      console.log('indexRemove',indexRemove)
      
        this.stock.splice(index,1)
        // arraysizeId.splice(indexRemove,1)
        this.localStorageArray.splice(indexRemove,1)
      
      
        // console.log('this.sizeID',this.sizeID)
        console.log('stoCK',this.stock)
        console.log('BinARRAY ',this.localStorageArray)
      
      // console.log('IIIII',itemray)
      // console.log('indexRemove',index.findIndex(item => item === arraysizeId[i].productsize_id))
      // console.log('BinIndex',arraysizeId.splice(indexRemove,1))
      
      localStorage.setItem('SelectProduct',JSON.stringify(this.localStorageArray));
    }}
    
    calTotal(stock:Stock[]) {
      this.total=0
      for(let i=0;i<stock.length;i++){
        if(stock[i].stock_size > 0) {
            this.total+= (stock[i].price*stock[i].quantity)
        }
      }
    }

  isPopupVisible: boolean = false;

  openPaymentPopup() {
    console.log('open',this.isPopupVisible)
    this.isPopupVisible = false;
    this.isPopupVisible = true;
  }

  onPopupClosed() {
    console.log('Popup ถูกปิด:', this.isPopupVisible);
    this.isPopupVisible = false;
  }
}
