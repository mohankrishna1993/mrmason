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

  servicePersonForm = new FormGroup({
    serviceCategory: new FormControl('',Validators.required),
    servicePerson: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    requestStatus: new FormControl('',Validators.required),

  });

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
     this.servicePersonData();
  }

  servicePersonData() {
    const servicePerson = this.servicePersonForm.value.servicePerson;
    const city = this.servicePersonForm.value.location;
    // this.apiService.getServicePersonData(servicePerson, city).subscribe((res: any) => {
    //   console.log(res);
    //   this.tableData = res.data;
    // });
    if (typeof servicePerson === 'string' && typeof city === 'string') {
      this.apiService.getServicePersonData(servicePerson, city).subscribe((res: any) => {
        console.log(res);
        this.tableData = res.data;
      });
    } else {
      
    }
  }

}
