import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { EditServiceNameComponent } from '../edit-service-name/edit-service-name.component';

@Component({
  selector: 'app-show-service-name',
  templateUrl: './show-service-name.component.html',
  styleUrls: ['./show-service-name.component.css']
})
export class ShowServiceNameComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 8;
  serviceCategories: any[] = [];




  constructor(private apiService: ApiserviceService,
    private dialog: MatDialog
    ) {}


 ngOnInit(): void {
  this.getTableData();
}

// openEditDialog(index: number, rowData: any): void {
//   const dialogRef = this.dialog.open(EditServiceNameComponent, {
//     width: '400px',
//     data: { index, rowData },
//   });


//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed', result);

//   });
// }
openEditDialog(item: any) {
  const dialogRef = this.dialog.open(EditServiceNameComponent, {
    width: '600px',
    data: { item },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if(result) {
      this.getTableData();
    }
    console.log('The dialog was closed');
   
  });
}
getTableData() {
  const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  this.apiService.getServiceData(appKey).subscribe(
    (response: any) => {
      this.tableData = response.data;
      this.totalLength = this.tableData.length;
    },
    (error) => {
      console.error('Error fetching service data:', error);
    }
  );
}


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}

}
