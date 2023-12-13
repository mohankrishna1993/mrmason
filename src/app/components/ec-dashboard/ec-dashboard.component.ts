import { Component } from '@angular/core';

@Component({
  selector: 'app-ec-dashboard',
  templateUrl: './ec-dashboard.component.html',
  styleUrls: ['./ec-dashboard.component.css']
})
export class EcDashboardComponent {

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
