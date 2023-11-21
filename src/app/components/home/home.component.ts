import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';



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
  choosenLocation = "";

  constructor(private apiService: ApiserviceService,
              private toast: ToastService,
              private authService: AuthService
              ){}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((t) => this.isLoggedIn = t);
    // this.authService.userId$.subscribe((u) => this.userId = u);
  }

  submitForm = new FormGroup({
    servicetype: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    servicedate: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    user_id: new FormControl('')
  });

  options: any = {
    componentRestrictions: { country: 'IN' }
  }


  isForm1Visible: boolean = true;
  isForm2Visible: boolean = false;
  text = "sample";

  slides = [
    {
      image: 'path-to-image-1.jpg',
      title: 'Slide 1 Title',
      description: 'Slide 1 Description',
    },
    {
      image: 'path-to-image-2.jpg',
      title: 'Slide 2 Title',
      description: 'Slide 2 Description',
    },
    // Add more slides as needed
  ];

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
    // Do some stuff

  }
  onSubmitRequestForm() {
    const userId = localStorage.getItem('USER_ID') ?? "";

    // console.log(this.submitForm);
    const data: ServiceRequest = {
      service_name: this.submitForm.value.servicetype ?? "",
      service_date: this.submitForm.value.servicedate ?? "",
      description: this.submitForm.value.description ?? "",
      location: this.choosenLocation,
      user_id: userId
    }
    console.log(data);
     this.apiService.sendSubmitRequestData(data).subscribe((res)=> {
      console.log(res);
      if(res['status']) {
        this.toast.show("Service Request submited Successfully");
        this.submitForm.reset();
      } else {
        this.toast.show("Service Request failed!")
      }
     })
  }

  ngAfterViewInit() {
  }



  toggleForm(formName: string) {
    if (formName === 'form1') {
      this.isForm1Visible = true;
      this.isForm2Visible = false;
    } else if (formName === 'form2') {
      this.isForm1Visible = false;
      this.isForm2Visible = true;
      console.log('*******')
    }

  }

}
