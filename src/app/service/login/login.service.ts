import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken : any;
  user : any;

  public isAuthorized : boolean = false;

  constructor(private httpClient : HttpClient, private router : Router) { }

  private apiUrl = "http://localhost:9000/api/user-accounts/login";

  login_sv(account : any){
    
    this.isAuthorized=true;
    let header = new HttpHeaders();
    var token = this.getToken();
    header.append('Authorization', `Bearer ${token}`);
    header.append('Content-Type', 'application/json');
    console.log("Account: " + account.username + " " + account.password);
    return this.httpClient.post<any>(this.apiUrl, account, {headers: header});
  }

  accessAdmin(){
    let header = new Headers();
    this.loadToken();
    header.append('Authorization' , this.authToken);
    header.append('Content-Type' , 'Application/json');
    // return 
  }

  getProfile(){
    this.loadToken();
    console.log(this.authToken);
    let header = new HttpHeaders()
      .set('Authorization' , `bearer ${this.authToken}`)
      .set('Content-Type' , 'Application/json');
    let api='http://localhost:9000/api/user-accounts/get/profile';
    return this.httpClient.get<any>(api, {headers: header});
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getToken(){
    return localStorage.getItem('id_token');
  }

  storeUserData(token : any, user? : any){
    localStorage.setItem('id_token', token);
    // localStorage.setItem('user', user);
    this.authToken=token;
    // this.user=JSON.stringify(user);
  }

  loggedIn(){
    let token : any = this.getToken();
    return !helper.isTokenExpired(token);
  }

  logout(){
    this.isAuthorized=false;
    this.authToken=null;
    this.user=null;
    localStorage.removeItem('id_token');
    //location.reload();
    this.router.navigateByUrl('/home')
  }

  getRole(){
    let headers = new HttpHeaders()
      .set('Authorization' , `bearer ${this.authToken}`)
      .set("Content-Type", 'Application/json');
    let api = "http://localhost:9000/api/user-accounts/get/role"
    return this.httpClient.get<any>(api, {headers : headers})
  }

  getAuthToken() : any{
    return this.authToken;
  }
}
