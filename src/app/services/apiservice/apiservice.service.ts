import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  ): Observable<object> {
    console.log(userData);
    const data = {
      "ADDRESS": userData.ADDRESS,
      "BUSINESS_NAME": userData.BUSINESS_NAME,
      "CITY": userData.CITY,
      "DISTRICT": userData.DISTRICT,
      "EMAIL_ID": userData.EMAIL_ID,
      "MOBILE_NO": userData.MOBILE_NO,
      "NAME":userData.NAME,
      "PASSWORD":userData.PASSWORD,
      "PINCODE_NO":userData.PINCODE_NO,
      "STATE":userData.STATE,
      "USER_TYPE":userData.USER_TYPE
    };
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const options = { headers: headers, responseType: 'text' };

    // const dataToSend = JSON.stringify(data);
    const jsonData = JSON.stringify(userData);
    return this.http.post<any>(`${this.baseUrl}/Users/register`,
    jsonData,  { headers: headers, responseType: 'json' });
  }

  //gettoken

  getToken() {
    return localStorage.getItem('token');
  }

  getServiceRequestData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ServiceRequest/getFilteredReport?SERVICE_NAME=carpenter&LOCATION=kandu`);
  }

  getServicePersonData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Staff/getFilteredReport?SERVICE_NAME=carpenter&CITY=Hyde&AVAILABLE_STATUS`);
  }


}
