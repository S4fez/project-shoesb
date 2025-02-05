import { Component, OnInit } from '@angular/core';
import { AccountService } from './service/account.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
constructor(private accountService:AccountService) {

}

  ngOnInit(): void {
    this.accountService.getProduct().subscribe(data =>{
      console.log(data)
    })

  }
  title = 'my-Finallproject';
}
