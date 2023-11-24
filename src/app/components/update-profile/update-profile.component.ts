import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  choosenLocation = "";

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private route: ActivatedRoute
   ) {}

   options: any = {
    componentRestrictions: { country: 'IN' }
  }


  updateForm = new FormGroup({
    name: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),

  });

  ngOnInit(){

    const user_id = localStorage.getItem('USER_ID') || '';

    this.apiService.getUserProfile(user_id).pipe(take(1)).subscribe(
      (userData: any) => {
        this.updateForm.patchValue({
          name: userData.data.NAME,
          location: userData.data.PINCODE_NO,
          city: userData.data.TOWN,
          state: userData.data.STATE,
          district: userData.data.DISTRICT
        });
        console.log(this.updateForm);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

  updateSubmitForm() {
      const updateprofile: updateProfile = {
        uName: this.updateForm.value.name ?? "",
        town: this.updateForm.value.city ?? "",
        state: this.updateForm.value.state ?? "",
        district: this.updateForm.value.district ?? "",
        location: this.choosenLocation,
      }

      console.log("*****location test");
      console.log(this.choosenLocation);

      const user_id = localStorage.getItem('USER_ID') || '';
      this.apiService.updateUserProfile(user_id, updateprofile).pipe(take(1)).subscribe(
        (response) => {
          console.log(response);
          if(response){
            this.toast.show(response.message);
            // this.refreshFormData(user_id);
          }
        },
        (error) => {
          console.error('Error updating user profile:', error);

        }
      );
    }

}
