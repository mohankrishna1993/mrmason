import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-update-service-name',
  templateUrl: './admin-update-service-name.component.html',
  styleUrls: ['./admin-update-service-name.component.css']
})
export class AdminUpdateServiceNameComponent {
  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addServiceNameForm = new FormGroup({

    serviceId: new FormControl('',Validators.required),
    subCategory: new FormControl('',Validators.required),
    serviceName: new FormControl('',Validators.required),
    addedBy: new FormControl('',Validators.required),



  });

  updateServiceNameSubmit() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

    const formData = this.addServiceNameForm.value;
    const updateData = {
      appKey: appKey,
      serviceId: formData.serviceId,
      servName: formData.serviceName,
      addedBy: formData.addedBy,
      subcategory: formData.subCategory
    };

    // Make the API call
    this.apiService.updateServiceName(updateData).subscribe(
      (response) => {
        // Handle success response
        console.log(response);
        this.toast.show('Service name updated successfully');
      },
      (error) => {
        // Handle error response
        console.error(error);
        this.toast.show('Failed to update service name');
      }
    );
  }




}
