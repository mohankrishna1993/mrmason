import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-assets-categories',
  templateUrl: './add-assets-categories.component.html',
  styleUrls: ['./add-assets-categories.component.css']
})
export class AddAssetsCategoriesComponent {

  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addAssetsCategoryForm = new FormGroup({

    category: new FormControl('',Validators.required),
    subcategory: new FormControl('',Validators.required),
    assetmodel: new FormControl('',Validators.required)


  });

  addAssetsCategorySubmit(){
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

    const addAssets: any = {
      category: this.addAssetsCategoryForm.value.category ?? "",
      subcategory: this.addAssetsCategoryForm.value.subcategory ?? "",
      addedBy: "admin",
    }

    this.apiService.addAssetsCategory(appKey,addAssets).subscribe(
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
