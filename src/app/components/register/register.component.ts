import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice/apiservice.service'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service';
import { userData } from '../../interfaces/user.modal';
import { ToastService } from 'src/app/services/toast/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
   ) {}


  signupForm = new FormGroup({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),

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
      const userData: userData = {
        uName: this.signupForm.value.name ?? "",
        mobile: this.signupForm.value.mobile ?? "",
        email: this.signupForm.value.email ?? "",
        password: this.signupForm.value.password ?? "",
        town: this.signupForm.value.city ?? "",
        state: this.signupForm.value.state ?? "",
        district: this.signupForm.value.district ?? "",
        pincode: this.signupForm.value.pincode ?? "",
      }

      this.authService.register(userData).subscribe((res: any) => {
        console.log("testing*****");
        console.log(res);

        this.router.navigate(['/verify-otp'], {
          queryParams: {
            email: this.signupForm.value.email,
            mobile: this.signupForm.value.mobile,
          },
        });
          if(res['status'])
          {
            this.toast.show("Registered Successfully!")
            this.router.navigate(['/verify-otp'], {
              queryParams: {
                email: this.signupForm.value.email,
                mobile: this.signupForm.value.mobile,
              },
            });

          } else {
            this.toast.show("Registration failed! Please enter correct details");
          }
        });

}
}
