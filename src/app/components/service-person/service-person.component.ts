import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice/apiservice.service';

@Component({
  selector: 'app-service-person',
  templateUrl: './service-person.component.html',
  styleUrls: ['./service-person.component.css']
})
export class ServicePersonComponent implements OnInit{

  tableData: any[] = [];

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
     this.servicePersonData();
  }
  servicePersonData() {
    console.log("*******1");
    this.apiService.getServicePersonData().subscribe((res: any) => {
      // console.log("****2");
      console.log(res);
      this.tableData = res.data;
    });
  }



}
