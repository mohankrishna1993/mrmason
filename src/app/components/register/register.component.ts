import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice/apiservice.service'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service';
import { userData } from '../../interfaces/user.modal';
import { ToastService } from 'src/app/services/toast/toast.service';
// import { gmailValidator } from 'src/app/validators/password-match.validator';
import { gmailValidator, numericValidator } from '../../validators/password-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  choosenLocation = "";

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
   ) {}


  signupForm = new FormGroup({

    email: new FormControl('',[Validators.required, Validators.email, gmailValidator()]),
    password: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required,numericValidator()]),
    city: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),

  });

  ngOnInit(){
  }

  options: any = {
    componentRestrictions: { country: 'IN', }
  }


  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

  signupSubmit() {
    console.log("test")
      const userData: userData = {

        email: this.signupForm.value.email ?? "",
        password: this.signupForm.value.password ?? "",
        uName: this.signupForm.value.name ?? "",
        mobile: this.signupForm.value.mobile ?? "",
        town: this.signupForm.value.city ?? "",
        state: this.signupForm.value.state ?? "",
        district: this.signupForm.value.district ?? "",
        pincode: this.choosenLocation,
        appKey: 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'
      }

      this.authService.register(userData).subscribe((res: any) => {
          if(res['status'])
          {
            this.toast.show("Registered Successfully!");
            this.router.navigate(['/verify-otp'], {
              queryParams: {
                email: this.signupForm.value.email,
                mobile: this.signupForm.value.mobile,
              },
            });

          } else {
            this.toast.show(res['message']);
          }
        });

}
}
