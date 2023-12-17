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
    this.serviceRequestData();
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
    this.serviceCategories = res.data.map((category: any) => category.serviceCategory);
    console.log(this.serviceCategories);

  });
}



 serviceRequestData() {
   this.apiService.getServiceRequestData().subscribe((res:any) => {
     console.log(res.data);

     this.tableData = res.data;
   });

 }

}
