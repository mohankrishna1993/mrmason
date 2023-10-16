import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice/apiservice.service';
import {userData} from '../../interfaces/user.modal';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiserviceService) {}
  private tokenKey = 'token';
  public login(username: string, password: string): void {
    this.apiService.login(username, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, 'true');
      this.router.navigate(['/dashboard']);
    });
  }

  public register(userData: userData) {
    this.apiService
      .register(userData)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/dashboard']);
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
