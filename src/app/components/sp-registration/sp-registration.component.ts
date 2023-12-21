import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-registration',
  templateUrl: './sp-registration.component.html',
  styleUrls: ['./sp-registration.component.css']
})
export class SpRegistrationComponent implements OnInit {

  choosenLocation = "";

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
   ) {}


  signupForm = new FormGroup({

    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required]),
    address: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),

  });

  ngOnInit(){
  }

  options: any = {
    componentRestrictions: { country: 'IN' }
  }


  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

  signupSubmit() {


      const userData: any = {
        email: this.signupForm.value.email ?? "",
        password: this.signupForm.value.password ?? "",
        spName: this.signupForm.value.name ?? "",
        mobile: this.signupForm.value.mobile ?? "",
        address: this.signupForm.value.address ?? "",
        town: this.signupForm.value.city ?? "",
        state: this.signupForm.value.state ?? "",
        district: this.signupForm.value.district ?? "",
        pincode: this.choosenLocation,
        appKey: 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'
      };

      
      this.apiService.registerServicePerson(userData).subscribe(
        (response) => {
          if (response && response.status) {

            this.toast.show("Registered Successfully!");
            this.router.navigate(['/sp-verify-otp'], {
              queryParams: {
                email: this.signupForm.value.email,
                mobile: this.signupForm.value.mobile,
              },
            });
          } else {

            this.toast.show(response['message']);
          }
        },
        (error) => {

          console.error('Error during service person registration:', error);
        }
      );
    }
}

