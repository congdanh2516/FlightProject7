import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httOptions = {
  headers : new HttpHeaders({'Content-Type':'Aplication/json'})
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  private apiUrl = "http://";

  login_sv(account : any){
    return this.httpClient.post(this.apiUrl, account);
  }
}
