import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent {

  constructor() {}

  updateForm = new FormGroup({
    name: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),

  });

  updateSubmitForm() {
    const updateprofile: updateProfile = {
      uName: this.updateForm.value.name ?? "",
      town: this.updateForm.value.city ?? "",
      state: this.updateForm.value.state ?? "",
      district: this.updateForm.value.district ?? "",
      location: this.updateForm.value.location ?? ""
    }


  }

}
