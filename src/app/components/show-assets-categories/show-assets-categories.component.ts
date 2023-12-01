import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-show-assets-categories',
  templateUrl: './show-assets-categories.component.html',
  styleUrls: ['./show-assets-categories.component.css']
})
export class ShowAssetsCategoriesComponent implements OnInit{

  assetCategoryData: any[] = [];

  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'; // replace with your actual API key
  // userId = localStorage.getItem('USER_ID') ?? "";

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getAssetCategoryData();
  }


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.assetCategoryData.slice(start, end);
}

getAssetCategoryData() {
  this.apiService.getAcategory(this.appKey).subscribe(
    (response) => {
      this.assetCategoryData = response.data;
    },
    (error) => {
      console.error('Error fetching asset category data:', error);
    }
  );
}

editAssetCategory(assetId: string) {
  console.log("**********8test");
  this.router.navigate(['dashboard/edit-asset-category',assetId]);
}

}
