import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-add-service',
  templateUrl: './sp-add-service.component.html',
  styleUrls: ['./sp-add-service.component.css']
})
export class SpAddServiceComponent implements OnInit{

  subCategories:string[] = [];
  selectedCategoryServices: any[] = [];
  addServiceForm!: FormGroup ;

  constructor(private apiService: ApiserviceService, private fb: FormBuilder,
    private toast: ToastService) {
    this.addServiceForm = this.fb.group({
      subCategory: ['',Validators.required],
      experience: ['',Validators.required],
      charges: ['',Validators.required],
      availability: ['',Validators.required],
      qualification: ['',Validators.required]


    });
  }

  ngOnInit() {


    this.getSubCategories();

  }

  getSubCategories() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    this.apiService.getScategory(appKey).subscribe((res: any) => {

      this.subCategories = res.data.map((category: any)=> {
        return category.serviceSubCategory

      });
      console.log("category",this.subCategories);
    });
  }

  onSubmit() {
    console.log(this.addServiceForm);
    if (this.addServiceForm.valid) {
      // const formData = this.addServiceForm.value;
      const data = {
        availableRange: this.addServiceForm.value.availability,
        charges: this.addServiceForm.value.charges,
        experience: this.addServiceForm.value.experience,
        qualification: this.addServiceForm.value.qualification,
        servType: this.addServiceForm.value.subCategory
      }


      this.apiService.postSpServiceData(data).subscribe(
        (response) => {
          if(response.status){
            this.toast.show("Service Added Successfully!");
            this.addServiceForm.reset();

          } else {
            this.toast.show("Adding Service Failed !");
          }
          // Handle success response
          console.log('API response:', response);
        },
        (error) => {
          // Handle error response
          console.error('API error:', error);
        }
      );
    }
  }



  onServiceSelectionChange() {
    const selectedCategory = this.addServiceForm.get('addService')?.value;

    if (selectedCategory) {

      const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
      const servSubCat = selectedCategory;

      this.apiService.getServiceNames(appKey, servSubCat).subscribe((res: any) => {


        console.log(res);
        this.selectedCategoryServices = res.data ? res.data : [];
      });
    } else {
      this.selectedCategoryServices = [];
    }
  }

}
