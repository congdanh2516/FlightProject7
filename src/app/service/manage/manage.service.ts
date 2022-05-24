import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(private httpClient : HttpClient, private login : LoginService) { }

  getPassengerList(flightCode : string){
    let headers = new HttpHeaders()
    .set('Authorization' , `bearer ${this.login.getAuthToken()}`)
    .set("Content-Type", "Application/json");
    console.log("Auth Token")
    console.log(this.login.getAuthToken());
    let api=`http://localhost:9000/api/info-flight/render-list-user/${flightCode}`;
    return this.httpClient.get<any>(api, {headers: headers});
  }

  verifyPassword(verifyInfo : any){
    let headers = new HttpHeaders()
      .set('Authorization' , `bearer ${this.login.getAuthToken()}`)
      .set("Content-Type", "Application/json");
    let api = "http://localhost:9000/api/info-flight/check-password-token";
    return this.httpClient.post<any>(api, verifyInfo, {headers : headers});
  }

  cancleFlight(aircode : any){
    let headers = new HttpHeaders()
      .set('Authorization' , `bearer ${this.login.getAuthToken()}`)
      .set("Content-Type", "Application/json");
    let api = "http://localhost:9000/api/info-flight/status/set";
    return this.httpClient.post<any>(api, aircode, {headers : headers});
  }
}
