import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-service-person-page',
  templateUrl: './service-person-page.component.html',
  styleUrls: ['./service-person-page.component.css']
})
export class ServicePersonPageComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;
  serviceCategories: string[] = [];
  choosenLocation = '';

  servicePersonForm = new FormGroup({
    serviceCategory: new FormControl('',Validators.required),
    servicePerson: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required]),
    registrationFromDate: new FormControl('',[Validators.required]),
    registrationToDate: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    requestStatus: new FormControl('',Validators.required),


  });

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
     this.servicePersonData();
     this.getServiceCategories();
  }

  getServiceCategories() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    this.apiService.getScategory(appKey).subscribe((res: any) => {
      this.serviceCategories = res.data.map((category: any) => category.serviceCategory);
      console.log("test");
      console.log(this.serviceCategories);

    });
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? '';
  }

  servicePersonData() {

    const serviceCategory = this.servicePersonForm.value.serviceCategory;
    const location = this.servicePersonForm.value.location;
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

    if (typeof serviceCategory === 'string' && typeof location === 'string') {
      this.apiService.searchPerson(appKey, location,serviceCategory).subscribe((res: any) => {
        console.log(res);
        this.tableData = res.data;
      });
    } else {

    }
  }

}
