import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-update-service',
  templateUrl: './sp-update-service.component.html',
  styleUrls: ['./sp-update-service.component.css'],
})
export class SpUpdateServiceComponent implements OnInit {
  subCategories: string[] = [];
  selectedCategoryServices: any[] = [];

  addServiceForm!: FormGroup;
  serviceId: string = '';
  subCategory: string = '';

  selection = new SelectionModel<any>(true, []);
  USER_SERVICES_ID = '';

  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.serviceId = history.state.serviceId;

  }

  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.subCategory = params['category'];
  //     const spServiceDetails$ = this.showMyServiceByCategory();
  //     const spServices$ = this.getServicePersonUserService();
  //     const getAllServices$ = this.adminServiceNamesGet();



  //   });

  // }
  ngOnInit() {
    this.addServiceForm = this.fb.group({
      subCategory: ['', Validators.required],
      experience: ['', Validators.required],
      charges: '',
      availability: ['', Validators.required],
      qualification: ['', Validators.required],
    });
    this.getSubCategories();
    this.route.params.subscribe((params) => {
      this.subCategory = params['category'];
      console.log('*********');

      forkJoin({
        serviceDetails: this.showMyServiceByCategory(),
        serviceNames: this.getServicePersonUserService(),
        allServiceNames: this.adminServiceNamesGet()
      }).subscribe(({serviceDetails, serviceNames, allServiceNames}) => {
        console.log('P%^&');
        console.log(serviceDetails);
        const details = serviceDetails[0];
        this.USER_SERVICES_ID = details.USER_SERVICES_ID;

        this.addServiceForm.patchValue({
          subCategory: details.SERVICE_TYPE,
          experience: Number(details.EXPERIENCE),
          charges: '12356',
          availability: details.AVAILABLE_WITHIN_RANGE,
          qualification: details.QUALIFICATION,
        });

        console.log(serviceNames.data[0].service_id);
        const serviceIds = serviceNames.data[0].service_id.split(',');
        console.log(serviceIds);
        // const userServiceIds = serviceNames[0];
        console.log(serviceDetails);
        console.log(allServiceNames);
        this.selectedCategoryServices = allServiceNames.data.map((obj: any) => ({service_id: obj.service_id, service_name: obj.service_name}));
        const choosenServiceNames = this.selectedCategoryServices.filter(obj => serviceIds.includes(obj.service_id));

        console.log(this.selectedCategoryServices);
        console.log(choosenServiceNames);
        this.selection.select(...choosenServiceNames);

        // "service_id": "ME0001",
        // "service_name": "House Plumbing",

        // console.log('spServiceDetails', spServiceDetails);
        // console.log('spServices', spServices);
        // console.log('allServices', allServices);


      });
    });
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
        userServId: this.serviceId,
      };
      forkJoin({callone: this.apiService.putSpServicesData(data, this.USER_SERVICES_ID), callTwo: this.UpdatespUserService(selectedServices)})
      .subscribe(({callone, callTwo}) => {
        if(callone.status && callTwo.status) {
            this.toast.show("Updated Successfully !");
        }
       else {
        this.toast.show("Update Failed !");
       }
      })

      // this.apiService.putSpServicesData(data).subscribe(
      //   (response) => {
      //     if (response.status) {
      //       this.toast.show('Service Updated Successfully!');
      //       this.UpdatespUserService(selectedServices);
      //     } else {
      //       this.toast.show('Updating Service Failed !');
      //     }
      //   },
      //   (error) => {
      //     console.error('API error:', error);
      //   }
      // );
    }
  }

  private UpdatespUserService(selectedServices: string[]) {
    const subCategory = this.addServiceForm.value.subCategory;

    return this.apiService
      .updateSpUserServices(selectedServices, subCategory);
  }

  getSelectedServices(): string[] {
    return this.selection.selected.map((item) => item.service_id);
  }

  showMyServiceByCategory(): Observable<any> {

    return this.apiService.showMyServicesBySubCategory(this.subCategory)
    .pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  adminServiceNamesGet() {

    return this.apiService.getServiceNames(this.subCategory);
  }

  getServicePersonUserService() {

    return this.apiService.getSpUserServices(this.subCategory);
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
