import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
@Component({
  selector: 'app-search-person-details',
  templateUrl: './search-person-details.component.html',
  styleUrls: ['./search-person-details.component.css']
})
export class SearchPersonDetailsComponent implements OnInit{

  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) {

  }

  ngOnInit() {
    this.route.queryParams
    .pipe(take(1))
    .subscribe(params => {
      console.log(params); 
      this.searchPersons(params['appKey'], params['location'], params['category']);

    }
  );




  }

  searchPersons(appKey: string, location: string, category: string) {
    this.apiService.searchPerson(appKey, location, category).subscribe(res =>
      {
        this.searchResults = res.data;
        console.log(this.searchResults);
      });

  }



}
