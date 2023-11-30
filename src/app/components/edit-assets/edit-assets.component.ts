import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-assets',
  templateUrl: './edit-assets.component.html',
  styleUrls: ['./edit-assets.component.css']
})
export class EditAssetsComponent implements OnInit{
  assetData: any[] = [];

  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'; // replace with your actual API key
  userId = localStorage.getItem('USER_ID') ?? "";

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getAssetData();
  }

 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.assetData.slice(start, end);
}

getAssetData() {
  this.apiService.getAssetData(this.appKey, this.userId).subscribe(
    (data) => {
      this.assetData = data.data;
    },
    (error) => {
      console.error('Error fetching asset data:', error);
    }
  );
}

editAsset(assetId: string) {

  this.router.navigate(['ec-dashboard/edit-asset', assetId]);


}


}
