import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  constructor(private apiService : ApiserviceService,
    private toast: ToastService,

   ) {}


  updateForm = new FormGroup({
    email: new FormControl('',Validators.required),
    oldPassword: new FormControl('',Validators.required),
    newPassword: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),

  });

  ngOnInit(){


  }

  updateSubmitForm() {
    const email = this.updateForm.value.email ?? '';
    const oldPassword = this.updateForm.value.oldPassword ?? '';
    const newPassword = this.updateForm.value.newPassword ?? '';
    const confirmPassword = this.updateForm.value.confirmPassword ?? '';
    const appKey = '';

    this.apiService.updatePassword(email, oldPassword, newPassword, confirmPassword,appKey).subscribe(
      (response) => {
        console.log(response);
        this.toast.show('Password reset successfully');

      },
      (error) => {
        console.error(error);
        this.toast.show('Password reset failed');
      }
    );
  }

  }
