import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice/apiservice.service';
import {userData} from '../../interfaces/user.modal';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiserviceService) {}
  private tokenKey = 'token';
  public login(username: string, password: string): void {
    this.apiService.login(username, password).subscribe({
      next :(res) => {
        if(res['status'] ) {
          localStorage.setItem(this.tokenKey, 'true');
          this.router.navigate(['/dashboard']);

        } else {
          console.log('enter correct creds');
        }

    },
   error: (error) => {
      // Handle the error and display a toast message
      // this.toastr.error('An error occurred while logging in. Please try again.', 'Error', {
      //   closeButton: true,
      //   progressBar: true,
      // });
    }
  });
  }

  public register(userData: userData) {
    this.apiService
      .register(userData)
      .subscribe((res: any) => {
        if(res['status'] ) {
          localStorage.setItem(this.tokenKey, 'true');
          this.router.navigate(['/dashboard']);

        } else {
          console.log('enter correct creds');
        }
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null;
  }
  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
