import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-service-request-page',
  templateUrl: './service-request-page.component.html',
  styleUrls: ['./service-request-page.component.css']
})
export class ServiceRequestPageComponent implements OnInit{
  tableData: any[] = [];

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
    this.serviceRequestData();
 }



 serviceRequestData() {
   this.apiService.getServiceRequestData().subscribe((res:any) => {
     console.log(res.data);

    //  const repeatedArray = [];
    //   for (let i = 0; i < 20; i++) {
    //     repeatedArray.push(res.data[0]);
    //   }
    //   this.tableData = repeatedArray;

     this.tableData = res.data;
   });

 }

}
