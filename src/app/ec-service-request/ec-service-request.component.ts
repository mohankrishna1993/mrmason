import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-ec-service-request',
  templateUrl: './ec-service-request.component.html',
  styleUrls: ['./ec-service-request.component.css']
})
export class EcServiceRequestComponent implements OnInit{
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 6;


  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl('',Validators.required),
    serviceName: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    requestStatus: new FormControl('',Validators.required),
    phoneNo: new FormControl('',Validators.required),

  });


  constructor(private apiService: ApiserviceService,private authService: AuthService) {}

  ngOnInit(): void {
    this.serviceRequestData();
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
    console.log(res.data);
    this.tableData = res.data;
  });
}

}
