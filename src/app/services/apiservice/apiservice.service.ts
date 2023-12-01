import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userData } from '../../interfaces/user.modal';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ToastService } from '../toast/toast.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  baseUrl = "http://65.1.178.54/app/index.php";
  // baseUrl1 = "http://13.235.76.132";
  baseUrl1= "http://15.207.114.112"
  // baseUrl1 = "https://adroitcoder.com/projects/api";
  user_id = "";


  constructor(private http:HttpClient,private toast: ToastService) { }

   login(username: string,password: string,appKey: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      username: username,
      password: password,
      appKey: appKey
      });
    return this.http.post(`${this.baseUrl1}/login`, data,
    { headers: headers, responseType: 'json' }
    );
  }

 register(userData: userData): Observable<any> {
    const data = {
      "appKey": userData.appKey,
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

  sendSubmitRequestData(serviceRequest: ServiceRequest,appKey: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({ ...serviceRequest, appKey: appKey });
      return this.http.post<any[]>(`${this.baseUrl1}/service-request.php`,
      data, { headers: headers, responseType: 'json' });
  }

  sendOtpByEmail(email: string,appKey: string): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const datanew = JSON.stringify({email: email,appKey: appKey});
    return this.http.post<any>(`${this.baseUrl1}/send-otp`, datanew, {
      headers: headers
    });

  }



  sendOtpByMobile(mobile: string,appKey: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const datanew = JSON.stringify({mobile: mobile,appKey: appKey});
    return this.http.post<any>(`${this.baseUrl1}/send-otp`, datanew, {
      headers: headers
    });

  }

  verifyOtpByMobile(mobile: string, otp: string,appKey: string): Observable<any> {

    // const apiUrl = 'https://adroitcoder.com/projects/api/verify-otp.php';
    const apiUrl = 'http://15.207.114.112/verify-otp.php';
    const data = {
      mobile: mobile,
      otp: otp,
      appKey: appKey
    }
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByEmail(email: string, otp: string,appKey: string): Observable<any> {
    // const apiUrl = 'https://adroitcoder.com/projects/api/verify-otp.php';
    const apiUrl = 'http://15.207.114.112/verify-otp.php';
    const data = {
      email: email,
      otp: otp,
      appKey: appKey
    }
    return this.http.post<any>(apiUrl, data);
  }

  getEcServiceRequestData(user_id: string,appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/get-service-request?user_id=${user_id}&appKey=${appKey}`;
    return this.http.get<any[]>(url);
  }

  getUserProfile(userId: string,appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/profile?user_id=${userId}&appKey=${appKey}`;
    return this.http.get(url);
  }

  updateUserProfile(user_id: string, updatedProfile: updateProfile,appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/update-profile?user_id=${user_id}&&state=${updatedProfile.state}&&town=${updatedProfile.town}&&district=${updatedProfile.district}&&uName=${updatedProfile.uName}&&pincode=${updatedProfile.location}&appKey=${appKey}`;
    return this.http.put(url, updatedProfile);
  }

  addAsset(appKey: string, userId: string, data: addAssetsData): Observable<any> {
    const url = `${this.baseUrl1}/addAsset`;
    const requestBody = {
      appKey: appKey,
      user_id: userId,
      ...data,
    };

    return this.http.post(url, requestBody);
  }

  getAssetData(appKey: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${this.baseUrl1}/getAsset?appKey=${appKey}&user_id=${userId}`, {
      headers: headers,
    });
  }

  getAssetDataById(appKey: string, userId: string,assetId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.baseUrl1}/getAsset?appKey=${appKey}&user_id=${userId}&asset_id=${assetId}`, {
      headers: headers,
    });
  }

  editAsset(appkey: string,assetId: string,data: addAssetsData):Observable<any> {

    // const url = `${this.baseUrl1}/update-profile?appKey=${appkey}&&asset_id=${assetId}&&category=${data.category}&&subcategory=${data.subcategory}&&location=${data.location}&&street=${data.street}&&door_no=${data.door_no}&&town=${data.town}&&district=${data.district}&&state=${data.state}&&pin_code=${data.pin_code}`

    const url = `${this.baseUrl1}/updateAsset`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const payload = {
      appKey: appkey,
      asset_id: assetId,
      ...data,
    };

    console.log(payload);

     return this.http.put(url,payload, {headers});
  }

  addAssetsCategory(appKey: string, data: any): Observable<any> {

    const url = `${this.baseUrl1}/addAcategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      appKey: appKey,
      ...data
    };
    return this.http.post(url, payload, { headers });
  }
  addServiceCategory(appKey: string, data: any): Observable<any> {

    const url = `${this.baseUrl1}/addScategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      appKey: appKey,
      ...data
    };
    return this.http.post(url, payload, { headers });
  }



  getAcategory(appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/getAcategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = { appKey: appKey };

    return this.http.get(url, { headers, params });
  }

  getScategory(appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/getScategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = { appKey: appKey };

    return this.http.get(url, { headers, params });
  }


  getAssetCategoryDetails(appKey: string, assetId: string): Observable<any> {
    const url = `${this.baseUrl1}/getAcategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      appKey: appKey,
      id: assetId
    };

    return this.http.get(url, { headers, params });
  }

  getServiceCategoryDetails(appKey: string, assetId: string): Observable<any> {
    const url = `${this.baseUrl1}/getScategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      appKey: appKey,
      id: assetId
    };

    return this.http.get(url, { headers, params });
  }

  editAssetCategory(appKey: string, data: any): Observable<any> {
    const url = `${this.baseUrl1}/updateAcategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      appKey: appKey,
      ...data,
    };

    return this.http.put(url, payload, { headers });
  }

  editServiceCategory(appKey: string, data: any): Observable<any> {
    const url = `${this.baseUrl1}/upScategory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      appKey: appKey,
      ...data,
    };

    return this.http.put(url, payload, { headers });
  }

  searchPerson(appKey: string, location: string, category: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'appKey': appKey
    });

    const params = new HttpParams()
      .set('location', location)
      .set('category', category);

    return this.http.get<any>(`${this.baseUrl1}service-person`, { headers, params });
  }
}







