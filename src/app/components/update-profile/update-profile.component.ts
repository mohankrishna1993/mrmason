import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { userData } from '../../interfaces/user.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

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

}
}
