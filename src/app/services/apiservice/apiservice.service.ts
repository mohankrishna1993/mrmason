import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userData } from '../../interfaces/user.modal';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  baseUrl = "http://65.1.178.54/app/index.php";

  constructor(private http:HttpClient,private toast: ToastService) { }

  public login(username: string,password: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      EMAIL_ID: username,
      PASSWORD: password,
      });
    return this.http.post(`${this.baseUrl}/Users/login`, data,
    { headers: headers, responseType: 'json' }
    );
  }

  public register(
    userData: userData
  ): Observable<object> {
    console.log(userData);
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify(userData);
    return this.http.post<any>(`${this.baseUrl}/Users/register`,
    data,  { headers: headers, responseType: 'json' });
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



}
