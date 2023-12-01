import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { take } from 'rxjs';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-assets-page',
  templateUrl: './edit-assets-page.component.html',
  styleUrls: ['./edit-assets-page.component.css']
})
export class EditAssetsPageComponent implements OnInit{

  assetId: string = '';
  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  userId =  localStorage.getItem('USER_ID') ?? "";

  constructor(private apiService: ApiserviceService,
              private toast: ToastService,
              private route: ActivatedRoute,
              ) {}

  editAssetsForm = new FormGroup({
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.assetId = params['id'];
      this.fetchAssetDetails();
    });
  }

  editAssetsSubmit(){

    const editAssets: addAssetsData = {
      category: this.editAssetsForm.value.assetsCategory ?? "",
      subcategory: this.editAssetsForm.value.assetsSubCategory ?? "",
      location: this.editAssetsForm.value.location ?? "",
      street: this.editAssetsForm.value.street ?? "",
      door_no: this.editAssetsForm.value.doornumber ?? "",
      town: this.editAssetsForm.value.town ?? "",
      district: this.editAssetsForm.value.district ?? "",
      state: this.editAssetsForm.value.state ?? "",
      pin_code: this.editAssetsForm.value.pincode ?? ""
    }

    // Change api
    this.apiService.editAsset(this.appKey, this.assetId, editAssets).subscribe(
      (response) => {
        console.log("test*****");
        console.log(response);
        if (response.status) {
          this.toast.show('Asset Updated successfully!');
        } else {
          console.log("test1****")
          this.toast.show('Failed to Update asset. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        this.toast.show('An error occurred while adding the asset.');
      }
    );
  }

  fetchAssetDetails() {
    this.apiService.getAssetDataById(this.appKey,this.userId,this.assetId).pipe(take(1)).subscribe(
      (response) => {
        const assetDetails = response.data[0];
        console.log(assetDetails);
        try{
          this.editAssetsForm.patchValue({

            assetsCategory: assetDetails.asset_cat,
            assetsSubCategory: assetDetails.asset_sub_cat,
            location: assetDetails.location,
            street: assetDetails.street,
            doornumber: assetDetails.door_no,
            town: assetDetails.town,
            district: assetDetails.district,
            state: assetDetails.state,
            pincode: assetDetails.pin_code,

            // Patch other fields if have
          });

        }
        catch(e) {
          console.log(e);
        }

        console.log(this.editAssetsForm);
      },
      (error) => {
        console.error('Error fetching asset details:', error);
      }
    );
  }

}
