import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = true;
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) { this.error = 'Please fill in all fields'; return; }
    this.loading = true; this.error = '';
    this.http.post<any>('/api/login', { username: this.username, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        if (res.userId) localStorage.setItem('userProfile', JSON.stringify({ user_id: res.userId, sys_role: 'customer' }));
        this.router.navigate(['/home']);
      },
      error: () => { this.error = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'; this.loading = false; }
    });
  }
}
