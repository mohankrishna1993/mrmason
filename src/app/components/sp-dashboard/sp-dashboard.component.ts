import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sp-dashboard',
  templateUrl: './sp-dashboard.component.html',
  styleUrls: ['./sp-dashboard.component.css']
})
export class SpDashboardComponent {


  @ViewChild('sidenav') sidenav!: MatSidenav;

  // reason = '';

  // close(reason: string) {
  //   this.reason = reason;
  //   this.sidenav.close();
  // }
  // navigateTo(route: string) {
  //   console.log(`Navigating to ${route}`);
  // }


}
