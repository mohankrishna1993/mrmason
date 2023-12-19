import { Component, OnDestroy, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  userType: any;
  constructor(private authService: AuthService,private router: Router) {}

  isLoggedIn: boolean = false;
  userName = '';
  isAdmin = false;

  private destroy$ = new Subject<void>();


  ngOnInit(): void {

    this.authService.userType$.subscribe(
      userType => this.userType = userType
    );
    
     this.authService.isLoggedIn$.subscribe((t) =>{
      this.isLoggedIn = t;

     }

     );
      this.authService.isAdmin$.subscribe((t) => this.isAdmin = t);
      this.authService.userName$.subscribe((r) => this.userName = r);

  }
  scrollDown(): void {
    window.scrollTo(0,document.body.scrollHeight);
  }


  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
