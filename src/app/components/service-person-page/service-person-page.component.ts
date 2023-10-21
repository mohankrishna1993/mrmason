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
    this.apiService.getServicePersonData().subscribe((res: any) => {
      // console.log("****2");
      console.log(res);
      // const repeatedArray = [];
    // for (let i = 0; i < 20; i++) {
      //   repeatedArray.push(res.data[0]);
      // }
      // this.tableData = repeatedArray;
      this.tableData = res.data;
    });
  }

}
