import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'ngx-toastr';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent {

  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addAssetsForm = new FormGroup({
    assetsCategory: new FormControl('',Validators.required),
    assetsSubCategory: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
    doornumber: new FormControl('',Validators.required),
    town: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required),

  });

  addAssetsSubmit(){
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    const userId = localStorage.getItem('USER_ID') ?? "";

    const addAssets: addAssetsData = {
      category: this.addAssetsForm.value.assetsCategory ?? "",
      subcategory: this.addAssetsForm.value.assetsSubCategory ?? "",
      location: this.addAssetsForm.value.location ?? "",
      street: this.addAssetsForm.value.street ?? "",
      door_no: this.addAssetsForm.value.doornumber ?? "",
      town: this.addAssetsForm.value.town ?? "",
      district: this.addAssetsForm.value.district ?? "",
      state: this.addAssetsForm.value.state ?? "",
      pin_code: this.addAssetsForm.value.pincode ?? ""
    }
    this.apiService.addAsset(appKey, userId, addAssets).subscribe(
      (response) => {
        console.log(response);
        if (response.status) {
          this.toast.show('Asset added successfully!');
        } else {
          this.toast.show('Failed to add asset. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        this.toast.show('An error occurred while adding the asset.');
      }
    );
  }

  }

