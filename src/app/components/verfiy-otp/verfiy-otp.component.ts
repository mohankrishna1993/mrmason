import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verfiy-otp',
  templateUrl: './verfiy-otp.component.html',
  styleUrls: ['./verfiy-otp.component.css']
})
export class VerfiyOtpComponent implements OnInit{
  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService) {}


  signupForm = new FormGroup({

    mobile: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),


  });

  ngOnInit(){
  }

  sendMobileOTP() {
    console.log(this.signupForm.value.mobile);
    const mobile = this.signupForm.value.mobile ?? ""; // Get the mobile number from your form
    this.apiService.sendOtpByEmail(mobile).subscribe(
      (response) => {
        console.log('Mobile OTP sent successfully', response);
      },
      (error) => {
        console.error('Failed to send mobile OTP', error);
      }
    );

  }

  sendEmailOTP() {
    console.log(this.signupForm.value.email);
    const email = this.signupForm.value.email ?? "";
    this.apiService.sendOtpByEmail(email).subscribe(
      (response) => {
        console.log('Email OTP sent successfully', response);
      },
      (error) => {
        console.error('Failed to send email OTP', error);
      }
    );

  }

  signupSubmit() {
    console.log('*********************************');
    console.log(this.signupForm);
      console.log(this.signupForm.value);
      const userData = {

        mobile: this.signupForm.value.mobile ?? "",
        email: this.signupForm.value.email ?? "",

      }
      console.log('*********');

      // this.authService.register(userData);
    // }




}

}
