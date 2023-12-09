import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('startTypewriter', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ width: 0, opacity: 0 }),
        animate('2s ease-in')
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit,OnInit {

  isLoggedIn = false;
  userId = "";
  location = "";
  choosenLocation = "";


  constructor(private apiService: ApiserviceService,
              private toast: ToastService,
              private authService: AuthService,
              private router: Router
              ){}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

              ngOnInit() {

                 this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
                 this.isLoggedIn = isLoggedIn;
                 });
              }


  submitForm1 = new FormGroup({
    servicetype: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
  });

  options: any = {
    componentRestrictions: { country: 'IN' }
  }


  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";

  }

  onSearchPerson() {

    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    const location = this.choosenLocation;
    const category = this.submitForm1.value.servicetype || '';
    this.router.navigate(['/search-person-details'], {
      queryParams: { appKey: appKey, location: location, category: category }
    });
  }

}
