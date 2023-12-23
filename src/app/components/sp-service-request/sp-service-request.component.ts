import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-sp-service-request',
  templateUrl: './sp-service-request.component.html',
  styleUrls: ['./sp-service-request.component.css']
})
export class SpServiceRequestComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;
  serviceCategories: any[] = [];
  selectedCategoryServices: any[] = [];


  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl('',Validators.required),
    serviceName: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    requestStatus: new FormControl('',Validators.required),
    phoneNo: new FormControl('',Validators.required),

  });

  constructor(private apiService: ApiserviceService,
    ) {}

  ngOnInit(): void {
    // this.serviceRequestData();
    this.getServiceCategories();
 }



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}

getServiceCategories() {
  const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  this.apiService.getScategory(appKey).subscribe((res: any) => {
    this.serviceCategories = res.data.map((category: any) => category.serviceSubCategory);
    console.log(this.serviceCategories);

  });
}

onServiceSelectionChange() {

  const selectedCategory = this.serviceRequestForm.get('serviceCategory')?.value;
  console.log(selectedCategory);

  if (selectedCategory) {
    this.selectedCategoryServices = [];

    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    const servSubCat = selectedCategory;

    this.apiService.getServiceNames(appKey, servSubCat).subscribe((res: any) => {
      if(res.status) {
      this.selectedCategoryServices = res.data.map((x: any) => x.service_name);
      }
    });
  } else {
    this.selectedCategoryServices = [];
  }
}




serviceRequestData() {
  const user_id = localStorage.getItem('username') ?? "";
  const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

  const serviceStatus = this.serviceRequestForm.value.requestStatus ?? "";
  const serviceName = this.serviceRequestForm.value.serviceCategory ?? ""

  this.apiService.getadminServiceRequestData(appKey,serviceStatus,serviceName).subscribe(
    (response: any) => {

      console.log(response);
      if(response.status) {
        this.tableData = response.data;
      } else {
        this.tableData = [];
      }

    },
    (error) => {
      console.error('Error fetching service request data:', error);
    }
  );
}

}
