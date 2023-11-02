import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formData!: FormGroup;

  constructor(private apiService: ApiserviceService,
    private authService: AuthService) {}

  ngOnInit() {

  }
  initForm() {
    this.formData = new FormGroup({
    email: new FormControl('',Validators.required),
    newpassword: new FormControl('',Validators.required)
   });
  }

  forgotPassword() {
    // Call the service to send a password reset email
    console.log("**********!");
    console.log(this.formData);
    this.authService.forgotPassword(this.formData.value.email,this.formData.value.newpassword);

  }


}
