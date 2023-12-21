import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ec-service-request',
  templateUrl: './ec-service-request.component.html',
  styleUrls: ['./ec-service-request.component.css']
})
export class EcServiceRequestComponent implements OnInit{
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 10;
  choosenLocation = "";
  subCategories: string[] = [];


  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl('',Validators.required),
    serviceName: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    requestStatus: new FormControl('',Validators.required),
    phoneNo: new FormControl('',Validators.required),

  });


  constructor(private apiService: ApiserviceService,
              private authService: AuthService,
              ) {}

  ngOnInit(): void {
    this.serviceRequestData();
    this.getSubCategories();
 }
 options: any = {
  componentRestrictions: { country: 'IN' }
}



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}



serviceRequestData() {
  const user_id = localStorage.getItem('USER_ID') || '';
  const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';


  console.log(user_id);
  this.apiService.getEcServiceRequestData(user_id,appKey).subscribe((res: any) => {
    console.log("***",res);
    console.log(res.data);
    this.tableData = res.data;
  });
}

public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";
}

getSubCategories() {
  const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'; // Replace with your actual app key
  this.apiService.getScategory(appKey).subscribe((res: any) => {
    console.log("**123**")
    console.log(res);
    this.subCategories = res.data.map((category: any)=> {
      return category.serviceSubCategory
      // console.log("category data",this.subCategories)

    });
    console.log("category",this.subCategories);
  });
}

}
