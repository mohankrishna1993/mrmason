import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-service-name',
  templateUrl: './admin-service-name.component.html',
  styleUrls: ['./admin-service-name.component.css']
})
export class AdminServiceNameComponent {
  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addServiceNameForm = new FormGroup({

    serviceId: new FormControl('',Validators.required),
    serviceName: new FormControl('',Validators.required),
    addedBy: new FormControl('',Validators.required),
    subCategory: new FormControl('',Validators.required)


  });

  // addServiceNameSubmit(){
  //   const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';


  // }

  addServiceNameSubmit() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

    // Retrieve form values
    const serviceId = this.addServiceNameForm.value.serviceId ?? "";
    const serviceName = this.addServiceNameForm.value.serviceName ?? "";
    const addedBy = localStorage.getItem('username') ?? "";
    const subCategory = this.addServiceNameForm.value.subCategory ?? "";
    // localStorage.getItem('USER_ID') ?? "";

    this.apiService.addServiceName(appKey,serviceId,serviceName, addedBy, subCategory).subscribe(
      (response) => {
        console.log(response);
        this.toast.show('Service Name added successfully');
      },
      (error) => {
        console.error(error);
        this.toast.show('Failed to add Service Name');
      }
    );
  }

}
