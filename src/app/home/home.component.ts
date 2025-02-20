import { Component,OnInit } from '@angular/core';
import { AccountService } from '../service/account.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private accountService:AccountService) {

  }
  ngOnInit(): void {
    this.accountService.getProduct().subscribe(data =>{
      console.log(data)
    })
    
  }

}
