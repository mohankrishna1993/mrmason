import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { forkJoin } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sp-add-service',
  templateUrl: './sp-add-service.component.html',
  styleUrls: ['./sp-add-service.component.css'],
})
export class SpAddServiceComponent implements OnInit {
  subCategories: string[] = [];
  selectedCategoryServices: any[] = [];
  addServiceForm!: FormGroup;
  selectedServices: any[] = [];
  selection = new SelectionModel<any>(true, []);

  constructor(
    private apiService: ApiserviceService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.addServiceForm = this.fb.group({
      subCategory: ['', Validators.required],
      experience: ['', Validators.required],
      charges: ['', Validators.required],
      availability: ['', Validators.required],
      qualification: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getSubCategories();
    this.onServiceSelectionChange();
  }

  getSubCategories() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    this.apiService.getScategory(appKey).subscribe((res: any) => {
      this.subCategories = res.data.map((category: any) => {
        return category.serviceSubCategory;
      });
      console.log('category', this.subCategories);
    });
  }



  // onSubmit() {
  //   console.log("subCategories:", this.addServiceForm.value.subCategory);
  //   console.log("experience:", this.addServiceForm.value.experience);

  //   if (this.addServiceForm.valid) {
  //     this.callFirstApi();
  //   }
  // }

  // private callFirstApi() {
  //   const data = {
  //     availableRange: this.addServiceForm.value.availability,
  //     charges: this.addServiceForm.value.charges,
  //     experience: this.addServiceForm.value.experience,
  //     qualification: this.addServiceForm.value.qualification,
  //     servType: this.addServiceForm.value.subCategory,
  //   };

  //   this.apiService.postSpServiceData(data).subscribe(
  //     (response) => {
  //       console.log("API response for postSpServiceData:", response);

  //       if (response.status) {
  //         this.toast.show('Service Added Successfully!');
  //         this.addServiceForm.reset();

  //         this.callSecondApi();
  //       } else {
  //         this.toast.show('Adding Service Failed!');
  //       }
  //     },
  //     (error) => {
  //       console.error('API error for postSpServiceData:', error);
  //     }
  //   );
  // }

  // private callSecondApi() {
  //   const selectedServices = this.selection.selected.map(
  //     (item) => item.service_id
  //   );

  //   const subCategory = this.addServiceForm.value.subCategory ?? "";
  //   console.log('SubCategory for addSpUserServices:', subCategory);

  //   this.apiService
  //     .addSpUserServices(
  //       selectedServices,
  //       subCategory,
  //       'updated_by_value'
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log("API response for addSpUserServices:", response);
  //         // Your existing code...
  //       },
  //       (error) => {
  //         console.error('API error for addSpUserServices:', error);
  //       }
  //     );
  // }

  onSubmit() {
    

    if (this.addServiceForm.valid) {
      const data = {
        availableRange: this.addServiceForm.value.availability,
        charges: this.addServiceForm.value.charges,
        experience: this.addServiceForm.value.experience,
        qualification: this.addServiceForm.value.qualification,
        servType: this.addServiceForm.value.subCategory,
      };

      const postSpServiceData$ = this.apiService.postSpServiceData(data);
      const addSpUserServices$ = this.callSecondApi();

      forkJoin([postSpServiceData$, addSpUserServices$])
        .pipe(
          catchError((error) => {
            console.error('Error in forkJoin:', error);

            return [];
          }),
          finalize(() => {

            console.log('Both requests completed.');
          })
        )
        .subscribe(
          ([postSpServiceDataResponse, addSpUserServicesResponse]) => {
            console.log('Response for postSpServiceData:', postSpServiceDataResponse);
            console.log('Response for addSpUserServices:', addSpUserServicesResponse);


            if (postSpServiceDataResponse.status) {
              this.toast.show('Service Added Successfully!');
              this.addServiceForm.reset();
            } else {
              this.toast.show('Adding Service Failed!');
            }
          }
        );
    }
  }

  private callSecondApi() {
    const selectedServices = this.selection.selected.map(
      (item) => item.service_id
    );

    const subCategory = this.addServiceForm.value.subCategory ?? "";
    console.log('SubCategory for addSpUserServices:', subCategory);

    return this.apiService.addSpUserServices(
      selectedServices,
      subCategory,
      'updated_by_value'
    );
  }


  onServiceSelectionChange() {
    const selectedCategory = this.addServiceForm.get('subCategory')?.value ?? "";
    console.log('selected value : ', selectedCategory);

    if (selectedCategory) {
      const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
      const servSubCat = selectedCategory;

      this.apiService
        .getServiceNames(appKey, servSubCat)
        .subscribe((res: any) => {
          console.log(res);
          this.selectedCategoryServices = res.data ? res.data : [];
          console.log(this.selectedCategoryServices);
        });
    } else {
      this.selectedCategoryServices = [];
    }
  }

  get allSelected(): boolean {
    return (
      this.selection.selected.length === this.selectedCategoryServices.length
    );
  }

  toggleMasterSelection() {
    if (this.allSelected) {
      this.selection.clear();
    } else {
      this.selection.select(...this.selectedCategoryServices);
    }
  }


}
