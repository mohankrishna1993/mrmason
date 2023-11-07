import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userData } from '../../interfaces/user.modal';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  baseUrl = "http://65.1.178.54/app/index.php";
  baseUrl1 = "http://43.204.168.30/register.php";
  // baseUrl1 = "https://adroitcoder.com/projects/api/register.php";

  constructor(private http:HttpClient,private toast: ToastService) { }

   login(username: string,password: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      EMAIL_ID: username,
      PASSWORD: password,
      });
    return this.http.post(`${this.baseUrl}/Users/login`, data,
    { headers: headers, responseType: 'json' }
    );
  }

 register(
    userData: userData
  ): Observable<object> {
    console.log(userData);
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify(userData);
    return this.http.post<any>(`${this.baseUrl1}`,
    data,  { headers: headers, responseType: 'json' });
  }

  //gettoken

  getToken() {
    return localStorage.getItem('token');
  }

  getServiceRequestData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ServiceRequest/getFilteredReport?SERVICE_NAME=carpenter&LOCATION=kandu`);
  }

  getServicePersonData(servicePerson: string, city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Staff/getFilteredReport?SERVICE_NAME=${servicePerson}&CITY=${city}&AVAILABLE_STATUS`);
  }

  sendPasswordResetEmail(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      EMAIL_ID: email,
      PASSWORD: password,
      });
    return this.http.post<any[]>(`${this.baseUrl}/Users/forgotPassword`,
    data, { headers: headers, responseType: 'json' });
  }

  sendSubmitRequestData(serviceRequest: ServiceRequest): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify(serviceRequest);
      return this.http.post<any[]>(`${this.baseUrl}/ServiceRequest/insert`,
      data, { headers: headers, responseType: 'json' });
  }

  sendOtpByEmail(email: string): Observable<any> {
    const apiUrl = 'http://43.204.168.30/send-otp.php';

    const params = new HttpParams().set('email', email);

    const options = {
      headers: new HttpHeaders(),
      params: params,
      observe: 'response' as const,
      responseType: 'json' as const,
      withCredentials: true,
    };

    return this.http.get(apiUrl, options);
  }



  sendOtpByMobile(mobile: string) {
    return this.http.get(`http://43.204.168.30/send-otp.php?mobile=${mobile}`);
  }



}
