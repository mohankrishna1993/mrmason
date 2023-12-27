import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetsCategoryReportComponent } from '../assets-category-report/assets-category-report.component';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent {
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 8;
  choosenLocation = "";


  customerRequestForm = new FormGroup({
    location: new FormControl('',Validators.required),
    registrationDate: new FormControl('',Validators.required),
    // membershipId: new FormControl('',[Validators.required]),
    phoneNo: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),

  });

  constructor(private apiService: ApiserviceService, private dialog: MatDialog) {}

  ngOnInit(): void {
  //  this.customerReportData();
 }

 options: any = {
  componentRestrictions: { country: 'IN', }
}
public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";
  // this.customerRequestForm.controls['location'].setValue(this.choosenLocation);

}



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}

onBlur(e: any) {
  console.log(e);
  if(e.target?.value === "") {
    this.choosenLocation = "";
    console.log('this.choosenLocation is cleared');
  }
}


customerReportData() {

  const formData = this.customerRequestForm.value;
  console.log(formData.location);


  if (formData.email || formData.phoneNo ||  this.choosenLocation || formData.registrationDate) {
    const appKey = this.apiService.appKey;

    this.apiService.searchCustomer(
      appKey,
      formData.email,
      formData.phoneNo,
      this.choosenLocation,
      formData.registrationDate
    ).subscribe(
      (response) => {
        console.log(response);

        this.tableData = response.data;
        this.totalLength = response.data.length;
        console.log(response.data);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  } else {
    console.log('At least one parameter is required to make the API request.');
    // You might want to handle this case in your UI, e.g., display a message to the user.
  }
}

openAssetCategoryDialog(customerID: string) {
  const dialogRef = this.dialog.open(AssetsCategoryReportComponent, {
    width: '600px',
    data: { customerID },
  });

}

}
