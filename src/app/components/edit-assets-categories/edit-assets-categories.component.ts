import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-assets-categories',
  templateUrl: './edit-assets-categories.component.html',
  styleUrls: ['./edit-assets-categories.component.css']
})
export class EditAssetsCategoriesComponent implements OnInit{
  constructor(private apiService: ApiserviceService,
              private toast: ToastService,
              private route: ActivatedRoute) {}

              assetId: string = '';
              appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

              addAssetsCategoryForm = new FormGroup({
                category: new FormControl('', Validators.required),
                subcategory: new FormControl('', Validators.required),
                addedby: new FormControl('', Validators.required),
              });

              ngOnInit() {
                this.route.params.subscribe((params) => {
                  this.assetId = params['id'];
                  this.fetchAssetCategoryDetails();
                });
              }

              editAssetCategoryForm() {
                const editAssetCategory: any = {
                  id: this.assetId,
                  category: this.addAssetsCategoryForm.value.category,
                  subcategory: this.addAssetsCategoryForm.value.subcategory,
                  updateBy: "admin"
                };

                this.apiService.editAssetCategory(this.appKey, editAssetCategory).subscribe(
                  (response) => {
                    console.log(response);
                    if (response.status) {
                      this.toast.show('Asset Category Updated successfully!');
                    } else {
                      this.toast.show('Failed to Update Asset Category. Please try again.');
                    }
                  },
                  (error) => {
                    console.error(error);
                    this.toast.show('An error occurred while updating the asset category.');
                  }
                );

            }

  fetchAssetCategoryDetails() {
    this.apiService.getAssetCategoryDetails(this.appKey, this.assetId).subscribe(
      (data) => {
        const assetCategoryDetails = data.data[0]; // Assuming your API response has a 'data' property
        this.addAssetsCategoryForm.patchValue({
          category: assetCategoryDetails.assetCategory,
          subcategory: assetCategoryDetails.assetSubCategory,
          addedby: assetCategoryDetails.addedBy
        });
      },
      (error) => {
        console.error('Error fetching asset category details:', error);
      }
    );
  }

}
