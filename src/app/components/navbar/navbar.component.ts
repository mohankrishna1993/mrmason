import { Component, OnDestroy, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  constructor(private authService: AuthService) {}
  isLoggedIn: boolean = false;
  userName = '';
  isAdmin = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
     this.authService.isLoggedIn$.subscribe((t) => this.isLoggedIn = t);
     this.authService.isAdmin$.subscribe((t) => this.isAdmin = t);
     this.authService.userName$.subscribe((r) => this.userName = r);
    //  this.authService.user$.subscribe((user) => this.user = user);
    //  this.user = localStorage.getItem('username');

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
