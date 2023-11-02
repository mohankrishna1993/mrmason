import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice/apiservice.service'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service';
import {userData} from '../../interfaces/user.modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService) {}


  signupForm = new FormGroup({
    usertype: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),
    businessname: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required)
  });

  ngOnInit(){
  }

  sendOTP() {
    
  }

  signupSubmit() {
    console.log('*********************************');
    console.log(this.signupForm);
    // if(this.signupForm.valid){
      console.log(this.signupForm.value);
      const userData: userData = {
        NAME: this.signupForm.value.name ?? "",
        BUSINESS_NAME: this.signupForm.value.businessname ?? "",
        MOBILE_NO: this.signupForm.value.mobile ?? "",
        EMAIL_ID: this.signupForm.value.email ?? "",
        ADDRESS: this.signupForm.value.address ?? "",
        CITY: this.signupForm.value.city ?? "",
        STATE: this.signupForm.value.state ?? "",
        DISTRICT: this.signupForm.value.district ?? "",
        PINCODE_NO: this.signupForm.value.pincode ?? "",
        USER_TYPE: this.signupForm.value.usertype ?? "",
        PASSWORD: this.signupForm.value.password ?? "",
      }
      console.log('*********');

      this.authService.register(userData);
    // }




}
}
