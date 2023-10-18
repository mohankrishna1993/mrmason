import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-service-person-page',
  templateUrl: './service-person-page.component.html',
  styleUrls: ['./service-person-page.component.css']
})
export class ServicePersonPageComponent implements OnInit{

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
