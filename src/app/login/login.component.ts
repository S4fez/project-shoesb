import { Component,AfterViewInit,ElementRef,Injectable,OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
@Injectable({
  providedIn: 'root'  // Service is provided in the root injector
})
export class LoginComponent implements AfterViewInit {
  userForm:FormGroup
  resForm:FormGroup
  constructor(private elementRef: ElementRef
    ,private accountService:AccountService,private fb: FormBuilder,private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    this.resForm = this.fb.group({
      username: ['', Validators.required],
      email:['',Validators.required],
      password: ['', [Validators.required]],
    });
  }
    inputValue: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    login() {
      const username = this.userForm.get('username')?.value;
      const password = this.userForm.get('password')?.value;
    
      this.accountService.postAccount(username, password).subscribe({
        next: (data) => {
          console.log(data);
          if (data) {
            localStorage.setItem('token', data.token);
            const profile = {
              userId: data.userId,
              email: data.email
            };
            localStorage.setItem('profile', JSON.stringify(profile));
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error(err);
    
          if (err.status === 401) {
            Swal.fire({
              icon: 'warning',
              title: 'Unauthorized',
              text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!',
              confirmButtonText: 'ตกลง'
            });
          } else if (err.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่!',
              confirmButtonText: 'ตกลง'
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              text: 'เกิดข้อผิดพลาดที่ไม่คาดคิด!',
              confirmButtonText: 'ตกลง'
            });
          }
        }
      });
    }
    register(){
      const username = this.resForm.get('username')?.value;
      const email = this.resForm.get('email')?.value;
      const password = this.resForm.get('password')?.value;
      this.accountService.postRegis(username,email,password).subscribe(data=>{
        console.log(data)
        // if (data){
        //   localStorage.setItem('token', data.token);
        //   this.router.navigate(['/home']);
        // }
      })
    }
     

  ngAfterViewInit() {
    const container = this.elementRef.nativeElement.querySelector('#container');
    const registerBtn = this.elementRef.nativeElement.querySelector('#register');
    const loginBtn = this.elementRef.nativeElement.querySelector('#login');
    
    localStorage.clear();

    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });
  }

}
