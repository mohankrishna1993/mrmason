import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { userData } from '../../interfaces/user.modal';
import { UserDetails } from '../../interfaces/user-details.modal'
import { ToastService } from '../toast/toast.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { SessionTimeoutService } from '../sessionTimeout/session-timeout.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userTypeSubject = new BehaviorSubject<string>('');
  private USER_TYPE_KEY = 'userType';
  userType$ = this.userTypeSubject.asObservable();

  constructor(private router: Router,
              private apiService: ApiserviceService,
              private toast: ToastService,
              private sessionTimeoutService: SessionTimeoutService) {
    this.isLoggedIn();
    this.userTypeSubject.next(localStorage.getItem(this.USER_TYPE_KEY) ?? "");
    // this.initSessionTimeoutListener();
  }

  private timeout: number = 30 * 1000;
  private lastActivity: number = Date.now();

  private tokenKey = 'token';
  public isLoggedIn$ = new BehaviorSubject(false);
  public isAdmin$ = new BehaviorSubject(false);
  public userName$ = new BehaviorSubject('');
  private user_id = '';

  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  public login(username: string, password: string,appKey: string): void {

    this.apiService.login(username, password,appKey).subscribe({
      next :(res) => {
        console.log(res);
        if(res['status']) {
          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(()=> {
            this.logout();

          });

          const userDetails = {
            username: username
          };

          localStorage.setItem('username', res.data.NAME);
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('USER_ID', res.data.USER_ID);
          localStorage.setItem('PINCODE_NO', res.data.PINCODE_NO);
          localStorage.setItem('EMAIL_ID',res.data.EMAIL_ID);
          console.log("*** populate");
          console.log('EMAIL_ID stored in localStorage:', res.data.EMAIL_ID);

          this.userName$.next(res.data.NAME);
          this.userTypeSubject.next("EC");
          localStorage.setItem(this.USER_TYPE_KEY, "EC");


          if(res.data.USER_TYPE === 'EC') {
            this.isAdmin$.next(false);
            this.router.navigate(['/ec-dashboard']);
            this.user.next({ username: username, role: 'user' });
          } else {
            this.isAdmin$.next(true);
            this.router.navigate(['/dashboard']);
          }
          this.isLoggedIn$.next(true);

        } else {
          this.toast.show(res.message);
        }

    },
   error: (error) => {

    }
  });
  }

  public splogin(username: string, password: string,appKey: string): void {

    this.apiService.spLogin(username, password,appKey).subscribe({
      next :(res) => {
        
        if(res['status']) {
          this.userTypeSubject.next("SP");
          localStorage.setItem(this.USER_TYPE_KEY, "SP");
          localStorage.setItem('CITY', res.data.CITY);
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('STATUS', res.data.STATUS);
          localStorage.setItem('PINCODE_NO', res.data.PINCODE_NO);
          localStorage.setItem('USER_ID',res.data.ID);
          localStorage.setItem('EMAIL_ID',res.data.EMAIL_ID);

          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(()=> {
            this.logout();

          });

          const userDetails = {
            username: username
          };



          console.log("cheecking the local staorage vale for user id");
          console.log(res.data.USER_ID);
          // console.log("*** populate");
          // console.log('EMAIL_ID stored in localStorage:', res.data.EMAIL_ID);

          this.userName$.next(res.data.NAME);

          if(res.data.USER_TYPE === 'Developer') {
            this.isAdmin$.next(false);
            this.router.navigate(['/sp-dashboard']);
            this.user.next({ username: username, role: 'user' });
          } else {
            this.isAdmin$.next(true);
            this.router.navigate(['/dashboard']);
          }
          this.isLoggedIn$.next(true);

        } else {
          this.toast.show(res.message);
        }

    },
   error: (error) => {

    }
  });
  }




  public adminLogin(username: string, password: string, appKey: string): void {
    this.apiService.adminLogin(username, password, appKey).subscribe({
      next: (res) => {
        console.log(res);
        if (res['status']) {
          localStorage.setItem('username', res.data[0].admin_name);


          this.userTypeSubject.next("ADMIN");
          localStorage.setItem(this.USER_TYPE_KEY, "ADMIN");

          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(()=> {
            this.logout();

          });
          const userDetails = {
            username: username
          };
          console.log(res);

          this.userName$.next(res.data[0].admin_name);
          localStorage.setItem(this.tokenKey, "true");
          this.router.navigate(['/dashboard']); // Change to the admin dashboard route
        } else {
          this.toast.show(res.message);
        }
      },
      error: (error) => {
        // Handle the error
      }
    });
  }

  public register(userData: userData): Observable<any> {
    return this.apiService.register(userData);
  }

  getUserId(){
    return this.user_id;
  }


  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('username');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('PINCODE_NO');
    localStorage.removeItem('EMAIL_ID');
    this.router.navigate(['/login']);
    this.isLoggedIn$.next(false);
    // this.toast.show("Logout Successfully");

  }

  public forgotPassword(email:string,newpassword: string) {
    this.apiService.sendPasswordResetEmail(email,newpassword).
    subscribe((res) => {
      if(res['status']) {
        this.router.navigate(['/login']);
      } else {
        console.log('enter correct creds');
      }
    })
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    let userName = localStorage.getItem('username') ?? "";
    console.log('is logged in', token != null);
    this.isLoggedIn$.next(token != null);
    this.userName$.next(userName);
    return token != null;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

}
