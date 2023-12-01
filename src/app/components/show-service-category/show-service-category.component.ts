import { ImplicitReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-show-service-category',
  templateUrl: './show-service-category.component.html',
  styleUrls: ['./show-service-category.component.css']
})
export class ShowServiceCategoryComponent {
  serviceCategoryData: any[] = [];

  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'; // replace with your actual API key
  // userId = localStorage.getItem('USER_ID') ?? "";

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getServiceCategoryData();
  }


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.serviceCategoryData.slice(start, end);
}

getServiceCategoryData() {
  this.apiService.getScategory(this.appKey).subscribe(
    (response) => {
      this.serviceCategoryData = response.data;
    },
    (error) => {
      console.error('Error fetching asset category data:', error);
    }
  );
}

editServiceCategory(assetId: string) {

  this.router.navigate(['dashboard/edit-service-category',assetId]);
}


}
