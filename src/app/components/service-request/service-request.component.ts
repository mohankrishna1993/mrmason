import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice/apiservice.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit{


  constructor(private apiService : ApiserviceService) {}
  ngOnInit(): void {
     this.serviceRequestData();
  }

  tableData: any[] = [];

  serviceRequestData() {
    this.apiService.getServiceRequestData().subscribe((res:any) => {
      console.log(res.data);
      this.tableData = res.data;
    });

  }
}
