import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userData } from '../../interfaces/user.modal';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ToastService } from '../toast/toast.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  baseUrl = "http://65.1.178.54/app/index.php";
  // baseUrl1 = "http://43.204.168.30";
  // baseUrl1 = "http://13.235.76.132";
  baseUrl1 = "https://adroitcoder.com/projects/api";
  user_id = "";


  constructor(private http:HttpClient,private toast: ToastService) { }

   login(username: string,password: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      username: username,
      password: password,
      });
    return this.http.post(`${this.baseUrl1}/login`, data,
    { headers: headers, responseType: 'json' }
    );
  }

 register(userData: userData): Observable<any> {
    const data = {
      "email": userData.email,
      "mobile": userData.mobile,
      "password": userData.password,
      "uName": userData.uName,
      "town": userData.town,
      "district": userData.district,
      "state": userData.state,
      "pincode": userData.pincode

    }
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const datanew = JSON.stringify(data);
    return this.http.post<any>(`${this.baseUrl1}/register.php`, datanew, {
      headers: headers
    });
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
      return this.http.post<any[]>(`${this.baseUrl1}/service-request.php`,
      data, { headers: headers, responseType: 'json' });
  }

  sendOtpByEmail(email: string): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const datanew = JSON.stringify({email: email});
    return this.http.post<any>(`${this.baseUrl1}/send-otp`, datanew, {
      headers: headers
    });

  }



  sendOtpByMobile(mobile: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const datanew = JSON.stringify({mobile: mobile});
    return this.http.post<any>(`${this.baseUrl1}/send-otp`, datanew, {
      headers: headers
    });

  }

  verifyOtpByMobile(mobile: string, otp: string): Observable<any> {
    const apiUrl = 'https://adroitcoder.com/projects/api/verify-otp.php';
    const data = {
      mobile: mobile,
      otp: otp
    }
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByEmail(email: string, otp: string): Observable<any> {
    const apiUrl = 'https://adroitcoder.com/projects/api/verify-otp.php';
    const data = {
      email: email,
      otp: otp
    }
    return this.http.post<any>(apiUrl, data);
  }

  getEcServiceRequestData(user_id: string): Observable<any> {
    const url = `${this.baseUrl1}/get-service-request?user_id=${user_id}`;
    return this.http.get<any[]>(url);
  }

  getUserProfile(userId: string): Observable<any> {
    const url = `${this.baseUrl1}/profile?user_id=${userId}`;
    return this.http.get(url);
  }

  updateUserProfile(user_id: string, updatedProfile: updateProfile): Observable<any> {
    const url = `${this.baseUrl1}/update-profile?user_id=${user_id}&&state=${updatedProfile.state}&&town=${updatedProfile.town}&&district=${updatedProfile.district}&&uName=${updatedProfile.uName}&&pincode=${updatedProfile.location}`;
    return this.http.put(url, updatedProfile);
  }

}
