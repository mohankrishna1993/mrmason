import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-service-category',
  templateUrl: './add-service-category.component.html',
  styleUrls: ['./add-service-category.component.css']
})
export class AddServiceCategoryComponent {
  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addServiceCategoryForm = new FormGroup({

    category: new FormControl('',Validators.required),
    subcategory: new FormControl('',Validators.required),
    addedby: new FormControl('',Validators.required),

  });

  addServiceCategorySubmit(){
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

    const addServices: any = {
      category: this.addServiceCategoryForm.value.category ?? "",
      subcategory: this.addServiceCategoryForm.value.subcategory ?? "",
      addedBy: this.addServiceCategoryForm.value.addedby ?? ""
    }

    this.apiService.addServiceCategory(appKey,addServices).subscribe(
      (response) => {
        console.log(response);
        if (response.status) {
          this.toast.show('Category added successfully!');
        } else {
          this.toast.show('Failed to add category. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        this.toast.show('An error occurred while adding the category.');
      }
    );

  }

}
