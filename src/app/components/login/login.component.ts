import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService} from '../../services/apiservice/apiservice.service'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service';
import { SessionTimeoutService } from 'src/app/services/sessionTimeout/session-timeout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formData!: FormGroup;


  constructor(private apiService: ApiserviceService,
              private authService: AuthService,
              private router : Router,
              private sessionTimeoutService: SessionTimeoutService
             ) {

             }



  ngOnInit(): void{
    this.initForm();
    // this.initSessionTimeoutListener();

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

}
