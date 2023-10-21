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
  isLoggedIn = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
     this.authService.isLoggedIn$.subscribe((t) => this.isLoggedIn = t);
  }



  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
