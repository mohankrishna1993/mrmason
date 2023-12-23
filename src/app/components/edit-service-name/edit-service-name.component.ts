import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-service-name',
  templateUrl: './edit-service-name.component.html',
  styleUrls: ['./edit-service-name.component.css']
})
// export class EditServiceNameComponent {
//   dialogRef: any;
//   constructor(@Inject(MAT_DIALOG_DATA) public data: { index: number, rowData: any }) {
//     console.log('Index:', data.index);
//     console.log('Row Data:', data.rowData);
//   }

//   onOkClick(): void {

//     console.log('Index:', this.data.index);


//     this.dialogRef.close();
//   }
// }
export class EditServiceNameComponent {
  addServiceNameForm: FormGroup;
  constructor(private toast: ToastService,
    private apiService: ApiserviceService,
    public dialogRef: MatDialogRef<EditServiceNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addServiceNameForm = new FormGroup({

      serviceId: new FormControl(data.item.service_id,Validators.required),
      serviceName: new FormControl(data.item.service_name,Validators.required),
      serviceCategory: new FormControl(data.item.service_subcategory,Validators.required),
    });
  }




  updateServiceNameSubmit() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    const formData = this.addServiceNameForm.value;
    const updateData = {
      appKey: appKey,
      serviceId: formData.serviceId,
      servName: formData.serviceName,
      addedBy: formData.addedBy,
      subcategory: formData.serviceCategory
    };

    this.apiService.updateServiceName(updateData).subscribe(
      (response) => {

        console.log(response);
        if(response.status) {

        this.toast.show('Service name updated successfully');
        this.dialogRef.close(true);

        }
        else {
        this.toast.show('Service name update failed');


        }
      },
      (error:any) => {
        // Handle error response
        console.error(error);
        this.toast.show('Failed to update service name');
      }
    );
  }

  onOkClick(): void {
    // handle Ok click if needed
    this.dialogRef.close();
  }
}

