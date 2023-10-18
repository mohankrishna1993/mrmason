import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {userData} from '../../interfaces/user.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  baseUrl = "http://65.1.178.54/app/index.php";

  constructor(private http:HttpClient) { }
  
  public login(username: string,password: string):Observable<any> {
    return this.http.post(`${this.baseUrl}/Users/login`, {
      EMAIL_ID: username,
      PASSWORD: password,
      },
      {
        responseType : 'text'
      }
    );
  }

  public register(
    userData: userData
  ): Observable<string> {
    return this.http.post(`${this.baseUrl}/Users/login`,
      {
        ...userData
      },
      { responseType: 'text' }
    );
  }

  //gettoken

  getToken() {
    return localStorage.getItem('token');
  }

  getServiceRequestData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ServiceRequest/getFilteredReport?SERVICE_NAME=painter&LOCATION=Nell&STATUS`);
  }

  getServicePersonData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Staff/getFilteredReport?SERVICE_NAME=painter&CITY=Hyde&AVAILABLE_STATUS`);
  }


}
