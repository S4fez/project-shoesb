import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private  router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(req.url)  สำหรับตรวจสอบ URL ที่ส่งมา
    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }
    // Get the auth token from localStorage or any other storage mechanism
    const authToken = localStorage.getItem('token'); // Example: 'Bearer your-token'
    if (authToken){
      if (!this.isTokenExpired(authToken)){
        // Clone the request and add the new header with the token
        const authReq = authToken
        ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      })
        : req;  // If no token, leave the request unchanged
        // Pass on the cloned request instead of the original request
        return next.handle(authReq);
      }
      else {
        this.router.navigate(['/login']);
        localStorage.clear();
        return throwError(() => new Error('Token expired'));
      }  
    }
    else {
      return throwError(() => new Error('Not have Token'));
    }
    
  }

   decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  // Function to check if the token has expiredd
  isTokenExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);
    const expirationTime = decodedToken.exp * 1000; // exp is in seconds, convert to milliseconds
    const currentTime = Date.now();
    
    return currentTime > expirationTime;
  }
}
