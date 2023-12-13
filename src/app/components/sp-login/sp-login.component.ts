import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionTimeoutService } from 'src/app/services/sessionTimeout/session-timeout.service';

@Component({
  selector: 'app-sp-login',
  templateUrl: './sp-login.component.html',
  styleUrls: ['./sp-login.component.css']
})
export class SpLoginComponent implements OnInit{

  formData!: FormGroup;


  constructor(private apiService: ApiserviceService,
              private authService: AuthService,
              private router : Router,
              private sessionTimeoutService: SessionTimeoutService
             ) {

             }



  ngOnInit(): void{
    this.initForm();
    this.initSessionTimeoutListener();

  }

  initForm() {
    this.formData = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required),
  });

  }

  loginProcess() {
    console.log("*****");
    if(this.formData?.valid) {
      console.log(this.formData.value);
      const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
      this.authService.login(this.formData.value.username,this.formData.value.password,appKey);
      this.sessionTimeoutService.onUserActivity();

    }
  }
  private initSessionTimeoutListener(): void {
    this.sessionTimeoutService.onTimeout().subscribe(() => {
      // Perform actions when session times out, e.g., redirect to login page
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }




}
