import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-sp-add-service',
  templateUrl: './sp-add-service.component.html',
  styleUrls: ['./sp-add-service.component.css']
})
export class SpAddServiceComponent implements OnInit{

  subCategories:string[] = [];
  selectedCategoryServices: any[] = [];
  addServiceForm!: FormGroup ;
  // selectedIndex = -1;

  constructor(private apiService: ApiserviceService, private fb: FormBuilder) {
    this.addServiceForm = this.fb.group({
      addService: ['',Validators.required],

    });
  }

  ngOnInit() {


    this.getSubCategories();
    // this.addServiceForm.get('asseaddServicetid')?.valueChanges.subscribe((value) => {
    //   console.log('***********');
    //   console.log(value);
    // }
    // );

  }

  getSubCategories() {
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S'; // Replace with your actual app key
    this.apiService.getScategory(appKey).subscribe((res: any) => {
      console.log("**123**")
      console.log(res);
      this.subCategories = res.data.map((category: any)=> {
        return category.serviceSubCategory
        // console.log("category data",this.subCategories)

      });
      console.log("category",this.subCategories);
    });
  }



  onServiceSelectionChange() {
    const selectedCategory = this.addServiceForm.get('addService')?.value;
    console.log("***321***************");
    console.log(selectedCategory);

    if (selectedCategory) {
      // Call the second API to get services for the selected category
      const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
      const servSubCat = selectedCategory;

      this.apiService.getServiceNames(appKey, servSubCat).subscribe((res: any) => {


        console.log(res);
        this.selectedCategoryServices = res.data ? res.data : [];
      });
    } else {
      this.selectedCategoryServices = [];
    }
  }

}
