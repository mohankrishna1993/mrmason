import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent {
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;


  serviceRequestForm = new FormGroup({
    location: new FormControl('',Validators.required),
    registrationDate: new FormControl('',Validators.required),
    membershipId: new FormControl('',[Validators.required]),
    phoneNo: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),

  });

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {

 }



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}



customerReportData() {
   this.apiService.getServiceRequestData().subscribe((res:any) => {
     console.log(res.data);

     this.tableData = res.data;
   });

 }

}
