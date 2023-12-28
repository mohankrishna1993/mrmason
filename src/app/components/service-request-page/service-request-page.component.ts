import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';


@Component({
  selector: 'app-service-request-page',
  templateUrl: './service-request-page.component.html',
  styleUrls: ['./service-request-page.component.css']
})
export class ServiceRequestPageComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;
  serviceCategories: any[] = [];
  selectedCategoryServices: any[] = [];
  choosenLocation = "";


  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl('',Validators.required),
    // serviceName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required]),
    registrationFromDate: new FormControl('',[Validators.required]),
    registrationToDate: new FormControl('',[Validators.required]),
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

 options: any = {
  componentRestrictions: { country: 'IN', }
}
public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";
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
  const serviceName = this.serviceRequestForm.value.serviceCategory ?? "";
  const requestedDate = this.serviceRequestForm.value.registrationFromDate ?? "";
  const serviceDate = this.serviceRequestForm.value.registrationToDate ?? "";
  const location = this.choosenLocation;



  this.apiService.getadminServiceRequestData(appKey,serviceStatus,serviceName,requestedDate,serviceDate,location,user_id).subscribe(
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
