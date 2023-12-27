import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-sp-showmy-services',
  templateUrl: './sp-showmy-services.component.html',
  styleUrls: ['./sp-showmy-services.component.css']
})
export class SpShowmyServicesComponent implements OnInit{

  myServices: any[] = [];

  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';


  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
   this.getUserServices();
  }


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.myServices.slice(start, end);
}

getUserServices() {
  const userId = localStorage.getItem("USER_ID") ?? "";
  this.apiService.showMyServices(this.appKey,userId).subscribe((response: any) => {

    this.myServices = response.data || [];

    // Set totalLength for pagination
    this.totalLength = this.myServices.length;
  });
}

onEdit(id: number) {
  console.log(id);

  const data = {
    availableRange: this.myServices[id].AVAILABLE_WITHIN_RANGE,
    charges: 0,
    experience: this.myServices[id].EXPERIENCE,
    qualification: this.myServices[id].QUALIFICATION,
    servType: this.myServices[id].SERVICE_TYPE,
    serviceId: this.myServices[id].USER_SERVICES_ID
  };
  this.router.navigateByUrl('/sp-dashboard/sp-update-service', { state: data });


}


}
