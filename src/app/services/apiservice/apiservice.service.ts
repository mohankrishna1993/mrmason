import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userData } from '../../interfaces/user.modal';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ToastService } from '../toast/toast.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { SessionTimeoutService } from '../sessionTimeout/session-timeout.service';
import { ServicePersonRegistration } from 'src/app/interfaces/ServicePersonRegistration.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  baseUrl = "http://65.1.178.54/app/index.php";
  // baseUrl1 = "http://13.235.76.132";
  baseUrl1= "http://15.207.114.112"
  baseUrl2 = "https://adroitcoder.com/projects/api";
  user_id = "";

  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

  constructor(private http:HttpClient,
              private toast: ToastService,
              private sessionTimeoutService: SessionTimeoutService) {
                this.initUserActivityListener();
              }

   login(username: string,password: string,appKey: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      username: username,
      password: password,
      appKey: appKey
      });
    return this.http.post(`${this.baseUrl1}/login.php`, data,
    { headers: headers, responseType: 'json' }
    );
  }

  adminLogin(username: string, password: string, appKey: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      username: username,
      password: password,
      appKey: appKey
    });

    return this.http.post(`${this.baseUrl1}/admin-login.php`, data, {
      headers: headers,
      responseType: 'json'
    });
  }

  spLogin(username: string,password: string,appKey: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const data = JSON.stringify({
      username: username,
      password: password,
      appKey: appKey
      });

      return this.http.post(`${this.baseUrl2}/splogin.php`, data,
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

  registerServicePerson(userData: ServicePersonRegistration): Observable<any> {
    const data = {
      appKey: userData.appKey,
      spName: userData.spName,
      mobile: userData.mobile,
      email: userData.email,
      password: userData.password,
      address: userData.address,
      city: userData.town,
      state: userData.state,
      district: userData.district,
      pincode: userData.pincode
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl2}/spregister`, data, { headers });
  }

  //gettoken

  getToken() {
    return localStorage.getItem('token');
  }

  getServiceRequestData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ServiceRequest/getFilteredReport?SERVICE_NAME=carpenter&LOCATION=kandu`);
  }

  // getServicePersonData(servicePerson: string, city: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/Staff/getFilteredReport?SERVICE_NAME=${servicePerson}&CITY=${city}&AVAILABLE_STATUS`);
  // }

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
    return this.http.post<any>(`${this.baseUrl1}/send-otp.php`, datanew, {
      headers: headers
    });

  }



  sendOtpByMobile(mobile: string,appKey: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    const datanew = JSON.stringify({mobile: mobile,appKey: appKey});
    return this.http.post<any>(`${this.baseUrl1}/send-otp.php`, datanew, {
      headers: headers
    });

  }

  sendEmailOtpForServicePerson(email: string,appKey: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const datanew = JSON.stringify({email: email,appKey: appKey});
    return this.http.post(`${this.baseUrl2}/spsendotp`, datanew, { headers });
  }

  sendMobileOtpForServicePerson(mobile: string,appKey: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const datanew = JSON.stringify({mobile: mobile,appKey: appKey});
    return this.http.post(`${this.baseUrl2}/spsendotp`, datanew, { headers });
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

  verifyOtpByMobileForServicePerson(mobile: string, otp: string,appKey: string): Observable<any> {

    const apiUrl = 'https://adroitcoder.com/projects/api/spverifyotp';

    // const apiUrl = 'http://15.207.114.112/verify-otp.php';
    const data = {
      mobile: mobile,
      otp: otp,
      appKey: appKey
    }
    return this.http.post<any>(apiUrl, data);
  }

  verifyOtpByEmailForServicePerson(email: string, otp: string,appKey: string): Observable<any> {
    const apiUrl = 'https://adroitcoder.com/projects/api/spverifyotp';
    // const apiUrl = 'http://15.207.114.112/verify-otp.php';
    const data = {
      email: email,
      otp: otp,
      appKey: appKey
    }
    return this.http.post<any>(apiUrl, data);
  }



  getEcServiceRequestData(user_id: string,appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/get-service-request.php?user_id=${user_id}&appKey=${appKey}`;
    return this.http.get<any[]>(url);
  }

  getUserProfile(userId: string,appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/profile.php?user_id=${userId}&appKey=${appKey}`;
    return this.http.get(url);
  }

  updateUserProfile(user_id: string, updatedProfile: updateProfile,appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/update-profile.php?user_id=${user_id}&&state=${updatedProfile.state}&&town=${updatedProfile.town}&&district=${updatedProfile.district}&&uName=${updatedProfile.uName}&&pincode=${updatedProfile.location}&appKey=${appKey}`;
    return this.http.put(url, updatedProfile);
  }

  addAsset(appKey: string, userId: string, data: addAssetsData): Observable<any> {
    const url = `${this.baseUrl1}/add-asset.php`;
    const requestBody = {
      appKey: appKey,
      user_id: userId,
      ...data,
    };

    return this.http.post(url, requestBody);
  }

  getAssetData(appKey: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${this.baseUrl1}/get-asset.php?appKey=${appKey}&user_id=${userId}`, {
      headers: headers,
    });
  }

  getAssetDataById(appKey: string, userId: string,assetId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.baseUrl1}/get-asset.php?appKey=${appKey}&user_id=${userId}&asset_id=${assetId}`, {
      headers: headers,
    });
  }


  editAsset(appkey: string,assetId: string,data: addAssetsData):Observable<any> {

    // const url = `${this.baseUrl1}/update-profile?appKey=${appkey}&&asset_id=${assetId}&&category=${data.category}&&subcategory=${data.subcategory}&&location=${data.location}&&street=${data.street}&&door_no=${data.door_no}&&town=${data.town}&&district=${data.district}&&state=${data.state}&&pin_code=${data.pin_code}`

    const url = `${this.baseUrl1}/update-asset.php`;
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

    const url = `${this.baseUrl1}/add-asset-cat.php`;
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

    const url = `${this.baseUrl1}/add-serv-cat.php`;
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
    const url = `${this.baseUrl1}/get-asset-cat.php`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = { appKey: appKey };

    return this.http.get(url, { headers, params });
  }

  getScategory(appKey: string): Observable<any> {
    const url = `${this.baseUrl1}/get-serv-cat.php`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = { appKey: appKey };

    return this.http.get(url, { headers, params });
  }


  getAssetCategoryDetails(appKey: string, assetId: string): Observable<any> {
    const url = `${this.baseUrl1}/get-asset-cat.php`;
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
    const url = `${this.baseUrl1}/get-serv-cat.php`;
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
    const url = `${this.baseUrl1}/up-asset-cat.php`;
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
    const url = `${this.baseUrl1}/up-serv-cat.php`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      appKey: appKey,
      ...data,
    };

    return this.http.put(url, payload, { headers });
  }

  searchPerson(appKey: string,location: string,category: string ): Observable<any> {
    const url = `${this.baseUrl1}/get-service-person.php`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      appKey: appKey,
      category: category,
      location: location
    }
      return this.http.get(url, {headers, params})
  }

  private initUserActivityListener(): void {
    document.addEventListener('mousemove', () => {
      this.sessionTimeoutService.onUserActivity();
    });

    document.addEventListener('keypress', () => {
      this.sessionTimeoutService.onUserActivity();
    });
  }

  // Inside ApiserviceService

updatePassword(email: string, oldPassword: string, newPassword: string, confirmPassword: string,appKey: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const data = {
    email: email,
    oldPwd: oldPassword,
    newPwd: newPassword,
    conPwd: confirmPassword,
    appKey: this.appKey,
    type: 'user'
  };

  return this.http.post(`${this.baseUrl1}/changepassword.php`, data, { headers, responseType: 'json' });
}

servicePersonUpdatePassword(email: string, oldPassword: string, newPassword: string, confirmPassword: string,appKey: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const data = {
    email: email,
    oldPwd: oldPassword,
    newPwd: newPassword,
    conPwd: confirmPassword,
    appKey: this.appKey,
    type: 'sp'
  };

  return this.http.post(`${this.baseUrl2}/changepassword`, data, { headers, responseType: 'json' });
}

adminUpdatePassword(email: string, oldPassword: string, newPassword: string, confirmPassword: string,appKey: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const data = {
    email: email,
    oldPwd: oldPassword,
    newPwd: newPassword,
    conPwd: confirmPassword,
    appKey: this.appKey,
    type: 'admin'
  };

  return this.http.post(`${this.baseUrl1}/changepassword`, data, { headers, responseType: 'json' });
}



}







