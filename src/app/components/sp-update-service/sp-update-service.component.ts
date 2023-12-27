import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-update-service',
  templateUrl: './sp-update-service.component.html',
  styleUrls: ['./sp-update-service.component.css']
})
export class SpUpdateServiceComponent implements OnInit{

  subCategories:string[] = [];
  selectedCategoryServices: any[] = [];

  addServiceForm!: FormGroup;
  serviceId: string = '';

  selection = new SelectionModel<any>(true,[])


  constructor(private apiService: ApiserviceService, private toast: ToastService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.serviceId = history.state.serviceId;
    this.addServiceForm = this.fb.group({
      subCategory: [ history.state.servType,Validators.required],
      experience: [history.state.experience,Validators.required],
      charges: [history.state.charges,Validators.required],
      availability: [history.state.availableRange,Validators.required],
      qualification: [history.state.qualification,Validators.required]


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

  // onSubmit() {
  //   console.log(this.addServiceForm);
  //   if (this.addServiceForm.valid) {

  //     const data = {
  //       availableRange: this.addServiceForm.value.availability,

  //       experience: this.addServiceForm.value.experience,
  //       qualification: this.addServiceForm.value.qualification,
  //       servType: this.addServiceForm.value.subCategory,
  //       userServId: this.serviceId
  //     }


  //     this.apiService.putSpServicesData(data).subscribe(
  //       (response) => {
  //         if(response.status){
  //           this.toast.show("Service Updated Successfully!");


  //         } else {
  //           this.toast.show("Updating Service Failed !");
  //         }
  //         console.log('API response:', response);
  //       },
  //       (error) => {

  //         console.error('API error:', error);
  //       }
  //     );
  //   }
  // }
  onSubmit() {
    if (this.addServiceForm.valid) {
      const selectedServices = this.getSelectedServices();


      console.log('Selected Services:', selectedServices);

      // Continue with your existing onSubmit logic
      const data = {
        availableRange: this.addServiceForm.value.availability,
        experience: this.addServiceForm.value.experience,
        qualification: this.addServiceForm.value.qualification,
        servType: this.addServiceForm.value.subCategory,
        userServId: this.serviceId
      };

      this.apiService.putSpServicesData(data).subscribe(
        (response) => {
          if (response.status) {
            this.toast.show("Service Updated Successfully!");
            this.callSecondApi(selectedServices);
          } else {
            this.toast.show("Updating Service Failed !");
          }
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }

  private callSecondApi(selectedServices: string[]) {

    const subCategory = this.addServiceForm.value.subCategory;


    this.apiService
      .updateSpUserServices(selectedServices, subCategory)
      .subscribe(
        (response) => {
          console.log('API response for updateSpUserServices:', response);
          // Your existing code...
        },
        (error) => {
          console.error('API error for updateSpUserServices:', error);
        }
      );
  }
  
  getSelectedServices(): string[] {
    return this.selection.selected.map((item) => item.service_id);
  }


  onServiceSelectionChange() {
    const selectedCategory = this.addServiceForm.get('subCategory')?.value;

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


  get allSelected(): boolean {
    return this.selection.selected.length === this.selectedCategoryServices.length;
  }

  toggleMasterSelection() {
   if(this.allSelected) {
    this.selection.clear();
   } else {
    this.selection.select(...this.selectedCategoryServices);
   }
  }

}
