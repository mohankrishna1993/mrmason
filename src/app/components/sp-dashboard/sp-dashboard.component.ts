import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sp-dashboard',
  templateUrl: './sp-dashboard.component.html',
  styleUrls: ['./sp-dashboard.component.css'],
})
export class SpDashboardComponent {

  isExpanded = true;

}
