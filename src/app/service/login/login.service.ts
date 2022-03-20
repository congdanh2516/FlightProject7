import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  private apiUrl = "http://localhost:9000/api/user-accounts/login";

  login_sv(account : any){
    let header = new HttpHeaders();
    var token = this.getToken();
    header.append('Authorization', `Bearer ${token}`);
    header.append('Content-Type', 'application/json');
    console.log("Account: " + account.username + " " + account.password);
    return this.httpClient.post(this.apiUrl, account, {headers: header});
  }

  getToken(){
    return localStorage.getItem('id_token');
  }
}
